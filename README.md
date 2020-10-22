# METU-Course-Capacity-Check
  A Node script that fetches specified course capacity and notifies when it is not full by beeping.
# How to Use
  1- Install Node.js
      <br></br>
  2- Install the missing packages via ```npm install <packagename>```. Probably you are going to need jsdom, which can be installed by running 
      <br>```npm install jsdom```</br>
      <br></br>
  3- Go to https://sis.metu.edu.tr/. Using the left pane; navigate to <b>Courses > Semester Information</b>
      <br></br>
  4- Select the Semester and Program. Then, press the Search button.
      <br></br>
  5- Copy the URL.
      <br></br>
  6- Open up a command line in the directory where your <b>courseCapacity.js</b> file is located and type the following
      <br>```node courseCapacity```</br>
      <br></br>
  7- You will be prompted to enter the URL. Paste the URL you copied on step 4.
      <br></br>
  8- Enter the course code.
      <br></br>
  9- Hit the enter button and wait. The code will beep when capacity is available.
      <br></br>

  <b>NOTE: There is no error checking on inputs. If you dont see course information after the Cycle # text, then you probably had entered an invalid/wrong course number</b>
