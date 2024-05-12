const Button = (props) => {
    return  <button {...props} className={`btn btn-sm rounded ${props.className}`}>{props.children}</button>
}

export default Button;