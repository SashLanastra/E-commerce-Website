
const Footer = () => {

    const year: number = new Date().getFullYear()

    const pageContent = <p>ShoppingSpree &copy; {year}</p>
  return (
        <footer className='footer w-full'>
            {pageContent}
        </footer>
  )
}

export default Footer