(defun strCount (str)
  (let ((obj (make-hash-table)))
    (loop for c across str
       do (if (gethash c obj)
              (setf (gethash c obj) (1+ (gethash c obj)))
              (setf (gethash c obj) 1)))
    obj
    ))

(defun contains-value (ht n)
  (let ((flag nil))
    (maphash #'(lambda (key val) (if (eq n val) (setf flag t))) ht)
    flag))


(let ((file (open "./input.txt")) (two-count 0) (three-count 0))
  (when file
    (loop
       for str = (read-line file nil)
       while str
       do (if (contains-value (strCount str) 2) (setf two-count (1+ two-count)))
       do (if (contains-value (strCount str) 3) (setf three-count (1+ three-count))))
    )
  (print (* two-count three-count)))
