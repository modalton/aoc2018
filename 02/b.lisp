(defun string-overlap (str-one str-two)
  (let ((overlap ""))
    (loop for c across str-one
       counting 1 into x
       do (if (char= (char str-two (1- x)) c) (setf overlap (concatenate 'string overlap (list c)))))
    overlap))

(defun string-one-off (str-one str-two)
  (>= 1 (- (length str-one) (length (string-overlap str-one str-two)))))

(let*
    ((file (open "./input.txt"))
     (ids (when file (loop for str = (read-line file nil) while str collect str)))
     (answer '()))
  (loop for i in ids
     counting 1 into x
     do (loop for j in (nthcdr x ids)
           do (if (string-one-off i j) (setf answer (list i j)))))
  (print (string-overlap (car answer) (cadr answer))))
