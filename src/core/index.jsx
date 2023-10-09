import Header from "./Header";
import Footer from "./Footer";

const DefaulLayout = ({ children }) => {
    return (
        <>
            <header className="">
                <section className='w-full'>
                    <Header />
                </section>
            </header>
            <div className='content-cms-wrapper'>
                <section className=''>
                    {children}
                </section>
            </div>
            <footer>
                <section className='w-full'>
                    <Footer/>
                </section>
            </footer>
        </>
    )
}

export default DefaulLayout;