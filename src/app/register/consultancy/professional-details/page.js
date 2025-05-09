import React from 'react'
import ProfessionalDetails from '@/components/register/step2/ProfessionalDetails'

export default function ProfessionalDetailsPage(data) {
  return (
    <ProfessionalDetails employer={false} consultancy={true} candidate={false} email={data.email}/>
  )
}
