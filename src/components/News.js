import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import '../App.css'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


//     useEffect(() => {
        
//         setTimeout(() => {
//             updateNews()
            
//         },1000);
//     }, [])

  // if(articles === undefined){
    //     console.log('uhbu')
    //     console.log(articles)
    //     setArticles([])
    // }
    // Math.ceil it makes(1.6 then =2, if 3.2 = 4) and totalResults is from Data and you should pass that in componentdidMount
    // const nextpage = async () => {
    //     // if (!(state.page + 1 > Math.ceil(totalResults / props.pageSize))) { 
    //     //    updateNews()
    //     //     }
    //     // }
    //     setPage(page + 1);
    //     updateNews();
    // }

//     const fetchMoreData = async () => {
//         setPage(page + 1)
//         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=56322d4f34814cfdbabecabaed1c7622&page=${page}&pageSize=${props.pageSize}`;
//         setLoading(true)
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         // if(parsedData.articles === articles ){
//         //     console.log("ji")
//         //     setArticles(articles)

//         // } else{
//         //     setArticles(articles.concat(parsedData.articles))
//         //       }
//         // if(articles === articles){
//         //     console.log("ji")
//         //     setArticles(articles)

//         // } else{
//         //     setArticles(articles.concat(parsedData.articles))
//         //       }
//         setTotalResults(parsedData.totalResults)
//         setLoading(false)
//     }

//     // console.log(articles)

//     // useEffect(() => {
        
//     //     setTimeout(() => {
//     //         fetchMoreData()
            
//     //     },5000);
//     // }, [])


//    const disable =() =>{
//     var x=window.scrollX;
//     var y=window.scrollY;
//     window.onscroll=function(){window.scrollTo(x, y);};
    
// }

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=42c44032a5c64b5c855b2685518b2a97&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
            document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews(); 
        // eslint-disable-next-line 
    }, [])
 

    // const handlePrevClick = async () => {
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async () => { 
    //     setPage(page+1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=42c44032a5c64b5c855b2685518b2a97&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center " style={{ margin: '61px 0px 3px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > {console.log(articles.length)}
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
