import axios from 'axios'
import { URL } from '../utils/base_url'


async function usePostApi(path, body) {
    debugger
    try {
        let { data } = await axios.post(URL + path, body)

        return data

    } catch (err) {
        return err
    }

}

export default usePostApi