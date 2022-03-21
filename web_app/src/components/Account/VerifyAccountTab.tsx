import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import {
  useGetImageIdLazyQuery,
  useUploadIdImageMutation
} from '../../graphql-generated/graphql'
import styles from './VerifyAccountTab.module.scss'
const VerifyAccountTab: FC = () => {
  const [frontSideFile, setFrontSideFile] = useState<File>()
  const [backSideFile, setBackSideFile] = useState<File>()
  const [frontPreview, setFrontPreview] = useState<string>()
  const [backPreview, setBackPreview] = useState<string>()
  const [uploadIdImageMutation] = useUploadIdImageMutation()
  const [getImageId] = useGetImageIdLazyQuery({
    onCompleted: (data) => {
      console.log(data)
      if (data.getImageId?.success) {
        setFrontPreview(
          `data:image/*;base64,${data.getImageId.data?.frontSide}`,
        )
        setBackPreview(`data:image/*;base64,${data.getImageId.data?.backSide}`)
      }
    },
  })
  useEffect(() => {
    getImageId()
  }, [])
  useEffect(() => {
    if (frontSideFile) {
      const objectUrl = URL.createObjectURL(frontSideFile)
      setFrontPreview(objectUrl)
    }
    if (backSideFile) {
      const objectUrl = URL.createObjectURL(backSideFile)
      setBackPreview(objectUrl)
    }
  }, [frontSideFile, backSideFile])

  const uploadIdImage = async () => {
    frontSideFile &&
      backSideFile &&
      uploadIdImageMutation({
        variables: {
          frontSide: frontSideFile,
          backSide: backSideFile,
        },
      })
  }
  return (
    <div className={styles.verifyAccountTab}>
      <label className={styles.uploadContainer}>
        <input
          accept="image/*"
          onChange={(e) => {
            setFrontSideFile(e.target.files?.[0])
          }}
          type="file"
          className={styles.inputFile}
        />
        Upload your front side of your ID
        {frontPreview && <Image src={frontPreview} layout="fill" />}
      </label>
      <label className={styles.uploadContainer}>
        <input
          accept="image/*"
          onChange={(e) => {
            setBackSideFile(e.target.files?.[0])
          }}
          type="file"
          className={styles.inputFile}
        />
        Upload your back side of your ID
        {backPreview && <Image src={backPreview} layout="fill" />}
      </label>
      <button
        className={styles.verifyButton}
        onClick={() => {
          uploadIdImage()
        }}
      >
        Verify Now
      </button>
    </div>
  )
}

export default VerifyAccountTab
