import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from '../components/TodoItem'
import styles from '../styles/modules/app.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {

  const todoList = useSelector((state) => state.todo.todoList)
  const filterStatus = useSelector((state) => state.todo.filterStatus)

  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time))


  const filteredTodoList = sortedTodoList.filter(item => {
    if (filterStatus === 'all') {
      return true
    }
    return item.status === filterStatus
  })

  // console.log(todoList)
  return (
    <motion.div className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
       <AnimatePresence>
      {filteredTodoList && filteredTodoList.length > 0
        ? filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        :   <motion.p variants={child} className={styles.emptyText}>
        No Todos
      </motion.p>
      }
      </AnimatePresence>
    </motion.div>
  )
}

export default AppContent