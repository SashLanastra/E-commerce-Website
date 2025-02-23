
const Footer = () => {

    const year: number = new Date().getFullYear()

    const pageContent = <p>ShoppingSpree &copy; {year}</p>
  return (
        <footer className='w-full bg-cyan-950 text-center text-white py-4'>
            {pageContent}
        </footer>
  )
}

export default Footer