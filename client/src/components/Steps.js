import React from 'react';
import { Step } from 'semantic-ui-react'

const Steps = ({}) => {
  return(
    <Step.Group>
    <Step>
      <Step.Content>
        <Step.Title>Client</Step.Title>
        <Step.Description>Register a Client</Step.Description>
      </Step.Content>
    </Step>
    <Step active>
      <Step.Content>
        <Step.Title>Logistics</Step.Title>
        <Step.Description>Enter Logistics Information</Step.Description>
      </Step.Content>
    </Step>
  <Step disabled>
    <Step.Content>
      <Step.Title>Dates</Step.Title>
      <Step.Description>Enter the Dates</Step.Description>
    </Step.Content>
  </Step>
  <Step disabled>
    <Step.Content>
      <Step.Title>Learner Information</Step.Title>
      <Step.Description>Enter a Learner's Information</Step.Description>
    </Step.Content>
  </Step>
</Step.Group>

  )
}
export default Steps;
