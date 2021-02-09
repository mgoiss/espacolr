import React from "react"
import ContentLoader from "react-content-loader"

const ScheduleDetailsinfo = () => (
  <ContentLoader 
    speed={2}
    width={250}
    height={210}
    viewBox="0 0 250 210"
    backgroundColor="#ecebeb"
    foregroundColor="#D6D2D2"
  >
    <rect x="0" y="0" rx="3" ry="3" width="250" height="36" /> 
    <rect x="0" y="50" rx="3" ry="3" width="180" height="24" /> 
    <rect x="0" y="120" rx="3" ry="3" width="120" height="24" /> 
    <rect x="0" y="160" rx="3" ry="3" width="180" height="50" />
  </ContentLoader>
)

export default ScheduleDetailsinfo