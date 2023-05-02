import './App.css'
import {Form} from './componentes/Form'
import {useEffect, useState, useRef} from 'react'

// MSAL imports
import {MsalProvider} from '@azure/msal-react'
import {useMsal} from '@azure/msal-react'
import {InteractionStatus, InteractionRequiredAuthError} from '@azure/msal-browser'
import {loginRequest} from './authConfig'

import {callMsGraph} from './utils/MsGraphApiCall'
import {Schedule} from './componentes/Schedule'

function Content() {
  // MSAL start
  const {instance, inProgress} = useMsal()
  const [graphData, setGraphData] = useState(null)

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph()
        .then(response => setGraphData(response))
        .catch(e => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount(),
            })
          }
        })
    }
  }, [inProgress, graphData, instance])
  // MSAL end

  const [schedule, set_schedule] = useState(null)
  const schedule_ref = useRef();

  if (graphData)
    return (
      <div className='App'>
        <div
          className='Container'
          style={{width: '23%'}}
        >
          <Form
            fullname={graphData.displayName}
            mail={graphData.mail.split('@')}
            is_schedule={schedule !== null}
            set_schedule={set_schedule}
            schedule_ref={schedule_ref}
          />
        </div>
        {schedule && (
          <div
            className='Container'
            style={{width: '50%'}}
          >
            <Schedule
              booked_schedule={schedule}
              ref={schedule_ref}
            />
          </div>
        )}
      </div>
    )
}

export default function App({pca}) {
  return (
    <MsalProvider instance={pca}>
      <Content />
    </MsalProvider>
  )
}
