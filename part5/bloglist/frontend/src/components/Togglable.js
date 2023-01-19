import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const showOnVisible = { display: visible ? '' : 'none' }
  const hideOnVisible = { display: visible ? 'none' : '' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisible
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  Togglable.displayName = 'Togglable'

  return (
    <div>
      <div style={hideOnVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showOnVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  )

})

export default Togglable