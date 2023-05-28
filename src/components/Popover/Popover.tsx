import { useState, useRef } from 'react'
import { useFloating, useHover, useInteractions, FloatingArrow, arrow } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
}

export default function Popover({ children, className, renderPopover }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef<SVGSVGElement>(null)
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom',
    middleware: [
      arrow({
        element: arrowRef
      })
    ]
  })
  const hover = useHover(context, {
    delay: {
      open: 10,
      close: 100
    }
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <div className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='floating min-w-28 min-h-16 mt-1 rounded-sm bg-white text-black'
            ref={refs.setFloating}
            style={{
              position: 'absolute',
              top: '25px'
            }}
            {...getFloatingProps()}
            initial={{ opacity: 0, transform: 'scale(0)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(0)' }}
            transition={{ duration: 0.2 }}
          >
            <FloatingArrow ref={arrowRef} context={context} fill='white' />
            {renderPopover}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
