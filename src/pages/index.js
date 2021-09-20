import * as React from 'react'
import Layout from '../components/main_layouts/main_layout'
import * as styles from './index.module.css'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'


const IndexPage = () => { 

  const data = useStaticQuery(graphql`
    query a {
      file(relativePath: {eq: "main-container-bg.jpg"}) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout pageTitle="Welcome">
      <div className={styles.container}>
      <BackgroundImage Tag={`section`} fluid={data.file.childImageSharp.fluid}>
        <p style={{fontSize: "40px", paddingTop: "80px", margin: "0px"}}>반갑습니다!</p>
        <br></br>
        <p>갓 전역한 휴학생의 블로그입니다</p>
        <p>편안한 마음으로 봐주시면 감사하겠습니다</p>
        <br></br>
        <p style={{paddingBottom: "80px"}}>* 아직 개발 중, 앞으로 열심히 추가할 예정입니다! *</p>
      </BackgroundImage>
      </div>
      <div className={styles.latestPosts}>
        <p style={{fontSize: "20px", verticalAlign: "top", margin: "auto"}}>
          latest posts
        </p>
      </div>
    </Layout>
  )
}

export default IndexPage