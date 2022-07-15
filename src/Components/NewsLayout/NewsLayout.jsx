import React, { useEffect } from 'react'
import './NewsLayout.css';
import { Grid, ScrollArea, Progress, Container, Spoiler } from '@mantine/core'
import animationData from './loading_animation.json';
import Lottie from 'react-lottie'
export default function NewsLayout({ data, loading, setPage, setId, page, id }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    useEffect(() => {
        console.log(data);
    }, [])

    return (
        <div id='news_layout'>
            <div className="news_container">
                <div className="row bg-s1">
                    <div className="column left">
                        <span className="dot" style={{ background: '#ED594A' }}></span>
                        <span className="dot mx-2" style={{ background: '#FDD800' }}></span>
                        <span className="dot" style={{ background: '#5AC05A' }}></span>
                    </div>
                    <div className="column middle">
                        {page === 'search' ? (
                            <input type="text" readOnly defaultValue="https://www.hackernews.com" />
                        ) : (
                            <input type="text" readOnly defaultValue={`https://www.hackernews.com/article/${id}`} />
                        )}

                    </div>
                    <div className="column right">
                        <div style={{ float: "right" }}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                </div>

                <div className="content bg-s2">
                    <ScrollArea style={{ height: "600px", overflowX: "hidden" }}>
                        {loading ? (
                            <Lottie
                                width={500}
                                height={500}
                                options={defaultOptions}
                            >
                            </Lottie>
                        ) : (
                            <>
                                {page === 'search' ? (
                                    <Grid className='dark overflow-x-hidden'>
                                        {data.map((ele, idx) => {
                                            return (
                                                <Grid.Col span={6}>
                                                    <div className="p-6 max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-s3 dark:border-s4 min-h-[200px] flex flex-col items-center justify-center">
                                                        <a href="#">
                                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{ele?.title}</h5>
                                                        </a>
                                                        <p className="mb-3 font-normal text-gray-700 dark:text-slate-200">Author: {ele.author}</p>
                                                        <a
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setId(ele?.objectID);
                                                                setPage('display');
                                                            }} href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Read more
                                                            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                        </a>
                                                    </div>
                                                </Grid.Col>
                                            )
                                        })}
                                    </Grid>
                                ) : (
                                    <div className='dark'>
                                        <Container>
                                            <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.title}</h5>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Points: {data?.points}</h5>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Comments</h5>
                                            <hr />
                                            {data?.children.map((ele, id) => {
                                                if (ele.author === null || ele.text === null) {
                                                    return (<></>)
                                                }
                                                let parser = new DOMParser();
                                                let html = parser.parseFromString(ele.text, 'text/html');
                                                return (
                                                    <div className="p-1 my-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-s3 dark:border-s4 flex flex-col items-center justify-center max-h-xl">
                                                        <a href="#">
                                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">By: {ele.author}</h5>
                                                        </a>
                                                        <Spoiler maxHeight={70} showLabel="Show more" hideLabel="Hide">
                                                            <div className="mb-3 relative left-0 px-3 text-left font-normal text-gray-700 dark:text-slate-200"
                                                                dangerouslySetInnerHTML={{ __html: html.body.innerHTML }}
                                                            >
                                                            </div>
                                                            {ele?.children?.length > 0 ? (<>
                                                                <a href="#">
                                                                    <h5 className="mb-2 text-lg font-bold px-3 tracking-tight text-gray-900 dark:text-white">Comments</h5>
                                                                </a>
                                                                <ScrollArea style={{ height: "150px" }}>
                                                                    {ele?.children.map((item, i) => {
                                                                        let parser = new DOMParser();
                                                                        let html = parser.parseFromString(item.text, 'text/html');
                                                                        return (<div className="p-1 my-2 w-4/5 ml-[100px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-s2 dark:border-s4 flex flex-col items-center justify-center max-h-sm">
                                                                            <a href="#">
                                                                                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">By: {item.author}</h5>
                                                                            </a>
                                                                            <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                                                                                <div className="mb-3 relative left-0 text-left font-normal text-gray-700 dark:text-slate-200"
                                                                                    dangerouslySetInnerHTML={{ __html: html.body.innerHTML }}
                                                                                >
                                                                                </div>
                                                                            </Spoiler>

                                                                        </div>)
                                                                    })}
                                                                </ScrollArea>
                                                            </>) : (<></>)}
                                                        </Spoiler>

                                                    </div>
                                                )
                                            })}
                                        </Container>
                                    </div>
                                )}
                            </>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
