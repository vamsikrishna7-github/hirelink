import React from 'react'
import ProfessionalDetails from '@/components/register/step2/ProfessionalDetails'

export default function ProfessionalDetailsPage(data) {
  return (
    <ProfessionalDetails employer={true} consultancy={false} candidate={false} email={data.email}/>
  )
}
