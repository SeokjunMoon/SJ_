import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as styles from './main_layout.module.css'
import { Helmet } from 'react-helmet'


const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    
    return (
        <div className={styles.container}>
            <Helmet>
                <title>{pageTitle} | {data.site.siteMetadata.title}</title>
                <script src="https://kit.fontawesome.com/d43bad4a7f.js" crossorigin="anonymous"></script>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Helmet>
            <div className={styles.topMenu}>
                <a href="#">
                    <span className="material-icons" style={{fontSize:'30px', margin: '22px 20px 20px 20px'}} onClick={event => {
                        const sbar = document.getElementById('sidebar').style;
                        const bg = document.getElementById('bg').style;
                        bg.display = 'block';

                        const innerWidth = window.innerWidth;
                        sbar.width = innerWidth >= '768'? '375px' : '100%';
                        sbar.display = 'block';
                    }}>
                        menu
                    </span>
                </a>
                <nav style={{display: "flex", justifyContent: "center"}}>
                    <ul className={styles.navLinks}>
                        <li>
                            <Link to="/" className={styles.navLinkText}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={styles.navLinkText}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts" className={styles.navLinkText}>
                                Posts
                            </Link>
                        </li>
                        <li>
                            <Link to="/photos" className={styles.navLinkText}>
                                Photos
                            </Link>
                        </li>
                        <li>
                            <Link to="/designs" className={styles.navLinkText}>
                                Designs
                            </Link>
                        </li>
                    </ul>
                    <h2 className={styles.mobileLogo}>SJ_log</h2>
                </nav>
                <a href="#">
                    <span className="material-icons" style={{fontSize: '30px', margin:'22px 20px 20px 20px'}}>
                        search
                    </span>
                </a>
            </div>
            <div className={styles.childrenContainer}>
                {children}
            </div>

            <div className={styles.sideMenu} id='sidebar'>
                <a href="#">
                    <span className="material-icons" style={{fontSize: '30px', margin: '20px'}} onClick={event => {
                        document.getElementById('sidebar').style.display = 'none';
                        document.getElementById('bg').style.display = 'none';
                    }}>
                        close
                    </span>
                </a>
                <p className={styles.sideLogo}>SJ_log</p>
                <ul className={styles.sideLinks}>
                    <li>
                        <Link to="/" className={styles.navLinkText}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={styles.navLinkText}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/posts" className={styles.navLinkText}>
                            Posts
                        </Link>
                    </li>
                    <li>
                        <Link to="/photos" className={styles.navLinkText}>
                            Photos
                        </Link>
                    </li>
                    <li>
                        <Link to="/designs" className={styles.navLinkText}>
                            Designs
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.background} id='bg'>

            </div>
        </div>
    )
}

export default Layout