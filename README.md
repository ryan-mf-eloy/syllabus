<h1>🔥NodeJS Fundamentals Challenge</h1>

<h2>☑Task Manager App</h2>
<p>
    The challenge is based on creating an API for a task management app, but using Node Streams to develop a task import feature from a CSV file.</br></br>
    As the course module only deals with node fundamentals, I created an api trying to limit myself to pure nodejs as much as possible, using only the "multer" libraries for file processing and "convert-csv-to-json" for converting the csv to JSON.</br></br>
    The data is being stored in memory inside a "db.json" file that is also read and written through streams.</br></br>
    As I already have some experience in NodeJs I ended up making my job more difficult and including a little more code.</br></br>
    To test the file import it is necessary to send a "multipart/form-data" in any HTTP client of your choice together with the "userId" and the "workSpaceId" to which the tasks of the file being imported refer.</br></br><strong>Example:</strong> </br></br><img src="./example.PNG">

    ❗ The api is running on 3000 port!

<br>
<strong>
    <a href="https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f">
        🔥 Challenge link
    </a>
</strong>
</p>

<hr>
<h3>➡ Routes</h3>

<ul style="list-style-type: none">
    <h4>Default</h4>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(5,232,97, 0.5);color: #025C26;font-weight: bold; margin-right: 8px;">GET</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/</span></li>
</ul>

<ul style="list-style-type: none;">
    <h4>User</h4>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(5,232,97, 0.5);color: #025C26;font-weight: bold; margin-right: 8px;">GET</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/user</span></span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(232,160,63, 0.5);color: #5C3F06;font-weight: bold; margin-right: 8px;">POST</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/user</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(255,216,47, 0.5);color: #5C5412;font-weight: bold; margin-right: 8px;">PUT</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/user/:id</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(234,27,0, 0.5);color: #5C0B00;font-weight: bold; margin-right: 8px;">DELETE</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/user/:id</span></li>
</ul>

<ul style="list-style-type: none">
    <h4>WorkSpace</h4>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(5,232,97, 0.5);color: #025C26;font-weight: bold; margin-right: 8px;">GET</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/workspace</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(232,160,63, 0.5);color: #5C3F06;font-weight: bold; margin-right: 8px;">POST</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/workspace</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(255,216,47, 0.5);color: #5C5412;font-weight: bold; margin-right: 8px;">PUT</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/workspace/:id</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(234,27,0, 0.5);color: #5C0B00;font-weight: bold; margin-right: 8px;">DELETE</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/workspace/:id</span></li>
</ul>

<ul style="list-style-type: none">
    <h4>Task</h4>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(5,232,97, 0.5);color: #025C26;font-weight: bold; margin-right: 8px;">GET</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/task</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(232,160,63, 0.5);color: #5C3F06;font-weight: bold; margin-right: 8px;">POST</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/task</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(232,160,63, 0.5);color: #5C3F06;font-weight: bold; margin-right: 8px;">POST</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/task/import</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(42,200,232, 0.5);color: #00375C;font-weight: bold; margin-right: 8px;">PATCH</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/task/:id/complete</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(255,216,47, 0.5);color: #5C5412;font-weight: bold; margin-right: 8px;">PUT</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/task/:id</span></li>
    <li style="margin: 10px; font-size: 14px"><span style="padding: 2px 5px; border-radius: 2px; background-color: rgba(234,27,0, 0.5);color: #5C0B00;font-weight: bold; margin-right: 8px;">DELETE</span> <span style="font-weight: 400; background-color: rgba(40,40,40, 0.5); padding: 2px 5px;border-radius: 0 4px 4px 0;letter-spacing: 0.4px">/task/:id</span></li>
</ul>
