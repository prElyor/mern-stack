import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import LinkCard from '../components/LinkCard'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/https.hook'


function DeatilPage() {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
         const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {
            
        }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading){
        return <Loader/>
    }

    console.log(link);

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}

export default DeatilPage
