(defun circular (items)
  (setf (cdr (last items)) items)
  items)


(let ((file (open "./input.txt")))
  (when file
    (let ((freq-list
           (circular
            (loop
               for line = (read-line file nil)
               while line
               collect (parse-integer line)
               finally (progn (close file)))))
          (seen (list 0)))
      (loop
         for num in freq-list
         while t
         summing num into total
         if (member total seen)
           do (progn (print total) (return total))
         else
         do (push total seen)
           )
      )
    ))
