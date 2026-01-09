import useSWR from 'swr'
import { BeadSku } from '@/data/skus'
import { useStore } from '@/store/useStore'
import { useEffect } from 'react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useSkus() {
    const { data, error, isLoading } = useSWR<BeadSku[]>('/data/skus.json', fetcher)
    const setSkuDefs = useStore(state => state.setSkuDefs)

    // Sync to store when loaded
    useEffect(() => {
        if (data) {
            setSkuDefs(data)
        }
    }, [data, setSkuDefs])

    return {
        skus: data || [],
        isLoading,
        error
    }
}
