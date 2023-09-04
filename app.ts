import { Server } from './models'
import 'dotenv/config'

const main = async () => {
    const server = new Server()
    
    server.listen()
}

main()