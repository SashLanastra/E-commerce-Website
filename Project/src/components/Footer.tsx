
const Footer = () => {

    const year: number = new Date().getFullYear()

    const pageContent = <p>ShoppingSpree &copy; {year}</p>
  return (
    <div>
        <footer className='footer'>
            {pageContent}
        </footer>
    </div>
  )
}

export default Footer