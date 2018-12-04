(let ((file (open "./input.txt")))
  (when file
    (loop
       for line = (read-line file nil)
       while line
       summing (parse-integer line) into total
       finally (progn (close file) (print total)))
    ))
