import path from 'path'
import dotenv from 'dotenv'
import { NFTStorage } from 'nft.storage'
import { getFilesFromPath } from 'files-from-path'
dotenv.config()
const token = process.env.NFT_STORAGE_TOKEN

async function main() {
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 3) {
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`)
  }
  const directoryPath = process.argv[2]

  const files = await getFilesFromPath(directoryPath, {
      pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
      hidden: false // use the default of false if you want to ignore files that start with '.'
  })

  const storage = new NFTStorage({ token })

  console.log(`storing ${files.length} file(s) from ${directoryPath}`)
  const cid = await storage.storeDirectory(files)
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)
}

main()
