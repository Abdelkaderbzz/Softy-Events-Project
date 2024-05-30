const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: 'auto',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width="301px"
      height="301px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dy="0.38em"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#2B78FFc"
        strokeWidth="0.6"
        fontSize="29"
        fontFamily="arial"
      >
        SoftyEvents
        <animate
          attributeName="stroke-dasharray"
          repeatCount="indefinite"
          calcMode="spline"
          dur="2.222s"
          values="0 85;85 85;0 85"
          keyTimes="0;0.5;1"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
        ></animate>
        <animate
          attributeName="stroke-dashoffset"
          repeatCount="indefinite"
          dur="2.222s"
          values="0;0;-85"
          keyTimes="0;0.5;1"
        ></animate>
      </text>
    </svg>
  )
}

export default Loader
