import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

//* Konfigurasi AWS S3
const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export function getFormattedTimestamp() {
  const now = new Date()
  const pad = (n) => n.toString().padStart(2, '0')

  const day = pad(now.getDate())
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]
  const month = monthNames[now.getMonth()]
  const year = now.getFullYear()

  const hours = pad(now.getHours())
  const minutes = pad(now.getMinutes())
  const seconds = pad(now.getSeconds())

  return `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`
}

export default S3
