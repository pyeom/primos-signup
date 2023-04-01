import './App.css'
import {Form} from './componentes/Form'
import {useEffect, useState} from 'react'

// MSAL imports
import {MsalProvider} from '@azure/msal-react'
import {useMsal} from '@azure/msal-react'
import {InteractionStatus, InteractionRequiredAuthError} from '@azure/msal-browser'
import {loginRequest} from './authConfig'

import {callMsGraph} from './utils/MsGraphApiCall'
import { Schedule } from './componentes/Schedule'

export default function App({pca}) {
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

  return (
    <MsalProvider instance={pca}>
      {graphData && (
        <div className='App'>
          <div className='Container'>
            <Form />
          </div>
        </div>
      )}
    </MsalProvider>
  )
}
