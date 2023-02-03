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
      toggleVisible,
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  Togglable.displayName = 'Togglable'

  return (
    <div>
      <div style={hideOnVisible}>
        <button onClick={toggleVisible} className='btn btn-primary mb-2'>{props.buttonLabel}</button>
      </div>
      <div style={showOnVisible}>
        {props.children}
        <button onClick={toggleVisible} className='btn btn-danger mb-2'>cancel</button>
      </div>
    </div>
  )
})

export default Togglable
