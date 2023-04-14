import './App.css'
import {Form} from './componentes/Form'
import {useEffect, useState} from 'react'

// MSAL imports
import {MsalProvider} from '@azure/msal-react'
import {useMsal} from '@azure/msal-react'
import {InteractionStatus, InteractionRequiredAuthError} from '@azure/msal-browser'
import {loginRequest} from './authConfig'

import {callMsGraph} from './utils/MsGraphApiCall'
import {Schedule} from './componentes/Schedule'

function Content() {
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

  if (graphData)
    return (
      <div className='App'>
        <div
          className='Container'
          style={{width: '23%'}}
        >
          <Form fullname={graphData.displayName} />
        </div>
        <div
          className='Container'
          style={{width: '50%'}}
        >
          <Schedule />
        </div>
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
