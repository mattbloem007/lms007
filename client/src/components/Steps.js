import React from 'react';
import { Step } from 'semantic-ui-react'

const Steps = ({activeArray, isCompleted}) => {
  return(
    <Step.Group>
    <Step active={activeArray.isClientActive}>
      <Step.Content>
        <Step.Title>Project</Step.Title>
        <Step.Description>Register a Project</Step.Description>
      </Step.Content>
    </Step>
    <Step active={activeArray.isLearnerActive}>
      <Step.Content>
        <Step.Title>Learner Information</Step.Title>
        <Step.Description>Register a Learner</Step.Description>
      </Step.Content>
    </Step>
  <Step active={activeArray.isAssessorActive}>
    <Step.Content>
      <Step.Title>Assessors and Moderators</Step.Title>
      <Step.Description></Step.Description>
    </Step.Content>
  </Step>
</Step.Group>

  )
}
export default Steps;
