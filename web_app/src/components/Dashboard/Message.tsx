import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { toNumber } from 'lodash'
import React, { useEffect, useState } from 'react'
import PlusIcon from '../../assets/icons/plus.svg'
import { ChatMaybe } from '../../constants/ActivitiesConstants'
import { useActivitiesContext } from '../../contexts/activitiesContext'
import { useAuthContext } from '../../contexts/authContext'
import { Chat } from '../../graphql-generated/graphql'
import styles from '../../styles/Message.module.scss'
import { formatTime } from '../../utils/formatter'
import { uuid } from 'uuidv4'
function Message() {
  const [selectedChat, setSelectedChat] = useState<ChatMaybe | null>(null)
  const { activitiesState } = useActivitiesContext()
  const closeChatBox = () => {
    setSelectedChat(null)
  }
  useEffect(() => {
    if (selectedChat) {
      // If activitiesState update the selectedChat
      let found = false
      !found &&
        activitiesState.provideActivities.forEach((element) => {
          if (element.chat.id === selectedChat.id) {
            setSelectedChat(element.chat)
            found = true
            return
          }
        })
      activitiesState.rentActivities.forEach((element) => {
        if (element.chat.id === selectedChat.id) {
          setSelectedChat(element.chat)
          return
        }
      })
    }
  }, [activitiesState])

  return (
    <AnimateSharedLayout>
      <motion.div className={styles.layout}>
        {/* Messages by Provide */}
        <motion.div className={styles.chatContainer}>
          <motion.p className={styles.chatHeader}>Provide</motion.p>
          {activitiesState.provideActivities
            ?.slice(0)
            .reverse()
            .map((activity) => {
              // console.log(activity)
              const chat = activity?.chat
              if (!chat) return null
              return (
                <PreviewBox
                  key={chat.id}
                  chat={chat}
                  setSelectedChat={setSelectedChat}
                />
              )
            })}
        </motion.div>

        {/* Messages by Rent */}
        <motion.div className={styles.chatContainer}>
          <motion.p className={styles.chatHeader}>Rent</motion.p>
          {activitiesState.rentActivities
            ?.slice(0)
            .reverse()
            .map((activity) => {
              // console.log(activity)
              const chat = activity?.chat
              if (!chat) return null
              return (
                <PreviewBox
                  key={chat.id}
                  chat={chat}
                  setSelectedChat={setSelectedChat}
                />
              )
            })}
        </motion.div>

        <AnimatePresence>
          {selectedChat && (
            <ChatBox
              closeChatBox={closeChatBox}
              id={selectedChat.id}
              title={selectedChat.title}
              chat={selectedChat}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimateSharedLayout>
  )
}
const PreviewBox: React.FC<{
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatMaybe | null>>
  chat: ChatMaybe
}> = ({ setSelectedChat, chat }) => {
  return (
    <motion.div
      layoutId={chat.id}
      layout
      className={styles.chatBoxPreview}
      onClick={() => setSelectedChat(chat)}
      key={chat.id}
    >
      <motion.p className={styles.chatTitle}>{chat.title}</motion.p>
      {/* Get lastest message */}
      <motion.p className={styles.previewMessageText}>
        {chat.messages[chat.messages.length - 1]?.text}
      </motion.p>
      {/* Get lastest message time */}
      <motion.p className={styles.previewMessageTime}>
        {formatTime(chat.messages[chat.messages.length - 1]?.createdAt)}
      </motion.p>
    </motion.div>
  )
}
const ChatBox: React.FC<{
  closeChatBox: () => void
  id: Chat['id']
  title: string
  chat: ChatMaybe
}> = ({ closeChatBox, id, title, chat }) => {
  const { authState } = useAuthContext()
  const [text, setText] = useState('')
  const { sendMessage } = useActivitiesContext()
  const send = () => {
    sendMessage(uuid(), toNumber(id), text)
  }
  return (
    <motion.div layout layoutId={id} className={styles.chatBoxLayout}>
      <motion.div className={styles.chatBoxHeader}>
        <motion.p className={styles.chatBoxTitle}>{title}</motion.p>
        <motion.button
          className={styles.chatBoxCloseBtn}
          onClick={closeChatBox}
        >
          <PlusIcon className={styles.chatBoxCloseIcon} />
        </motion.button>
      </motion.div>
      <motion.div className={styles.chatBox}>
        {/* Get the newest first */}
        {chat.messages.map((message) => {
          if (message?.user.id === authState.user!.id) {
            return (
              <motion.div className={styles.sendMessage} key={message.id}>
                <motion.p className={styles.messageTime}>
                  {formatTime(message?.createdAt)}
                </motion.p>
                <motion.p className={styles.messageText}>
                  {message?.text}
                </motion.p>
              </motion.div>
            )
          } else {
            return (
              <motion.div className={styles.receivedMessage} key={message?.id}>
                <motion.p className={styles.messageText}>
                  {message?.text}
                </motion.p>
                <motion.p className={styles.messageTime}>
                  {formatTime(message?.createdAt)}
                </motion.p>
              </motion.div>
            )
          }
        })}
      </motion.div>
      <motion.div className={styles.sendMessageContainer}>
        <motion.textarea
          placeholder="Enter your message"
          className={styles.sendMessageInput}
          //If press Shift + Enter => new line
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault()
              console.log('new line')
              e.currentTarget.value += '\n'
              console.log(e.currentTarget.value)
            } else if (e.key === 'Enter') {
              e.preventDefault()
              e.currentTarget.value = ''
              send()
              setText('')
            }
          }}
          onChange={(e) => setText(e.currentTarget.value)}
          value={text}
        />
        <motion.button
          className={styles.sendMessageBtn}
          onClick={() => {
            // Conver id to number
            send()
            setText('')
          }}
        >
          <FontAwesomeIcon
            className={styles.sendMessageIcon}
            icon={faPaperPlane}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
export default Message
