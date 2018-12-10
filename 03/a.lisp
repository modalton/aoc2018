(defun overlap-area (square-pair)
  (destructuring-bind
        (((a-left-x a-down-y) (a-right-x a-up-y) )
         ((b-left-x b-down-y) (b-right-x b-up-y)))
      square-pair
    (let ((x-overlap (or  (if (and (<= b-left-x a-right-x) (>= b-right-x a-left-x)) (if (<= b-left-x a-left-x) (- b-right-x a-left-x) (- a-right-x b-left-x) )) -1 ))
          (y-overlap (or (if (and (<= b-down-y a-up-y) (>= b-up-y a-down-y)) (if (<= b-down-y a-down-y) (- b-up-y a-down-y) (- a-up-y b-down-y) )) -1)))
      (let ((overlap (* x-overlap y-overlap)))
        (if (> overlap 0) overlap 0))
    )))

(defun file-obj-to-coord (obj)
  (destructuring-bind
        (id x-offset y-offset width height) obj
    `((,x-offset ,y-offset) (,(+ x-offset width) ,(+ y-offset height)))))

(defun tester ()
  (let*
      ((file (open "./lispy_input.txt"))
       (objs (when file (loop for line = (read file nil) while line collect line))))
    objs
    (loop for i in objs
       counting 1 into x
         do (loop for j in (nthcdr x objs) ))
    )
)

