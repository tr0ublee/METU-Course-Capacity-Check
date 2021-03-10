# METU-Course-Capacity-Check
  A Node script that fetches specified course capacity and notifies when it is not full by beeping.
# Disclaimer
<h3><br> I do not take any responsibility in case of misuse of the code. Every user is responsible for their own actions. Use it at your own risk.</br></h3>

# How to Use
  1- Install Node.js
      <br></br>
  2- Go to https://sis.metu.edu.tr/. Using the left pane; navigate to <b>Courses > Semester Information</b>
      <br></br>
  3- Select the Semester and Program. Then, press the Search button.
      <br></br>
  4- Copy the URL.
      <br></br>
  5- Open up a command line in the directory where your <b>courseCapacity.js</b> file is located and type the following
      <br>```node courseCapacity```</br>
      <br></br>
  6- You will be prompted to enter the URL. Paste the URL you copied on step 4.
      <br></br>
  7- Enter the course code.
      <br></br>
  8- Hit the enter button and wait. The code will beep when capacity is available.
      <br></br>

  <b>NOTE: There is no error checking on inputs. If you dont see course information after the Cycle # text, then you probably had entered an invalid/wrong course number</b>
