const Notification = ({ message, type }) => {

    if (message === null) {
        return null
    }

    if (type === "success") {
        const successStyle = {
            color: 'green',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
        return (
          <div style={successStyle}>
            {message}
          </div>
        )
    } else {
        const errorStyle = {
            color: 'red',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
        return (
          <div style={errorStyle}>
            {message}
          </div>
        )
    }
    
    
}

export default Notification