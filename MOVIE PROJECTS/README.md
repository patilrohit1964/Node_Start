<h1 align="center">🎥 Basic CRUD Movie Project</h1>

<p>This project demonstrates a simple <b>CRUD (Create, Read, Update, Delete)</b> application to manage movies. It is designed as a foundational project to showcase how basic operations are handled in a web application.</p>

---

<h2>🚀 Features</h2>
<ul>
  <li><b>Create:</b> Add new movies by filling out a form with details such as title, genre, release date, and rating.</li>
  <li><b>Read:</b> View a list of all the movies stored in the database with relevant details displayed.</li>
  <li><b>Update:</b> Edit existing movie details by selecting a movie and modifying its information.</li>
  <li><b>Delete:</b> Remove movies from the database with a simple click.</li>
</ul>

---

<h2>🛠️ Technologies Used</h2>
<ul>
  <li><b>Frontend:</b>
    <ul>
      <li>React (for building the user interface).</li>
      <li>CSS or TailwindCSS (for styling).</li>
    </ul>
  </li>
  <li><b>Backend:</b>
    <ul>
      <li>Node.js with Express.js (for API endpoints).</li>
    </ul>
  </li>
  <li><b>Database:</b>
    <ul>
      <li>MongoDB (to store movie data).</li>
    </ul>
  </li>
</ul>

---

<h2>⚙️ How It Works</h2>
<h3>1. Create Movie:</h3>
<p>A form is provided where users can enter movie details like name, genre, and rating. On submitting the form, the data is sent to the backend API via an HTTP POST request, and the movie is added to the database.</p>

<h3>2. Read Movies:</h3>
<p>The application fetches all movies from the database via an HTTP GET request and displays them in a list or table format. Each movie is shown with options to edit or delete.</p>

<h3>3. Update Movie:</h3>
<p>The user can click an "Edit" button for a specific movie. This pre-fills a form with the existing movie data, allowing the user to modify and save changes. The data is updated in the database via an HTTP PUT or PATCH request.</p>

<h3>4. Delete Movie:</h3>
<p>Users can click a "Delete" button for a movie. A confirmation dialog may appear to prevent accidental deletion. On confirmation, an HTTP DELETE request is sent to the backend to remove the movie from the database.</p>

---

<h2>📖 Project Setup</h2>
<ol>
  <li><b>Clone the Repository:</b>
    <pre><code>git clone https://github.com/patilrohit1964/Node_Start/tree/main/MOVIE%20PROJECTS
cd movie-crud-project
    </code></pre>
  </li>
  <li><b>Install Dependencies:</b>
    <ul>
      <li>For the backend:
        <pre><code>cd server
npm install
        </code></pre>
      </li>
      <li>For the frontend:
        <pre><code>cd client
npm install
        </code></pre>
      </li>
    </ul>
  </li>
  <li><b>Start the Application:</b>
    <ul>
      <li>Run the backend server:
        <pre><code>npm run dev
        </code></pre>
      </li>
      <li>Run the frontend development server:
        <pre><code>npm run dev
        </code></pre>
      </li>
    </ul>
  </li>
  <li><b>Database Setup:</b>
    <p>Configure your MongoDB connection string in the backend <code>.env</code> file. Ensure the required collections or tables are created.</p>
  </li>
</ol>

---

<h2>✨ Future Enhancements</h2>
<ul>
  <li><b>Search and Filter:</b> Add a search bar to filter movies by name, genre, or rating.</li>
  <li><b>Authentication:</b> Implement user authentication for secure access.</li>
  <li><b>Pagination:</b> Implement pagination to handle large datasets.</li>
  <li><b>UI Enhancements:</b> Improve the interface with animations, better design, and responsiveness.</li>
  <!-- <li><b>Deploy the App:</b> Host it on platforms like Heroku, Vercel, or AWS for live access.</li> -->
</ul>

---

<p align="center">💻 Happy Coding!</p>
