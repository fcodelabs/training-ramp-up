
const Header:React.FC<{text: any}> = ( {text} ) => {
    const headerStyle = {
        paddingRight: '50px', 
    };
    return (
        <div style={headerStyle}>
            {text}
        </div>
    );
}

export { Header };