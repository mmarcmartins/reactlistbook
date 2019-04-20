
const prettifyName = name => {
    const firstLetterUpper = name.charAt(0).toUpperCase()
    return firstLetterUpper + name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').substring(1)
}


export { prettifyName }