const fetch = require("node-fetch");
const { WebClient } = require("@slack/web-api");
require("dotenv/config");
const web = new WebClient(process.env.SLACK_BOT_TOKEN);


const sendRandomMotivationLink =()=>{

  const motivationLinks = [
     "https://www.mindtools.com/pages/article/avoiding-burnout.htm",
     "https://blog.rescuetime.com/category/burnout/",
     "https://99u.adobe.com/articles/24201/11-ways-to-avoid-burnout",
    "https://www.helpguide.org/articles/stress/burnout-prevention-and-recovery.htm",
     "https://www.nytimes.com/2019/11/06/smarter-living/avoid-burnout-work-tips.html",
     "https://www.lifehack.org/articles/featured/11-simple-ways-to-avoid-burnout.html",
     "https://www.themuse.com/advice/13-ways-the-busiest-people-ever-avoid-burnout",
    "https://www.thetimes.co.uk/article/how-to-avoid-burnout-seven-changes-you-need-to-make-now-x9d6crsc6",
     "https://www.healthline.com/health/tips-for-identifying-and-preventing-burnout",
     "https://www.bbc.com/worklife/article/20200330-covid-19-how-to-learn-a-new-skill-in-coronavirus-quarantine",
  ];

  const relaxMusicLinks = [
    "https://www.youtube.com/watch?v=lFcSrYw-ARY",
    "https://www.youtube.com/watch?v=pjtsGzQjFM4",
    "https://www.youtube.com/watch?v=UPVoeWOokz8",
    "https://www.youtube.com/watch?v=RTj5IeA432Y",
    "https://www.youtube.com/watch?v=FjHGZj2IjBk",
    "https://www.youtube.com/watch?v=XmBji07OtwA",
    "https://www.youtube.com/watch?v=cMzyLBuFm4A",
    "https://www.youtube.com/watch?v=dN1XUV6QclU"
  ]

  const randomMotivLink = motivationLinks[Math.floor(Math.random() * motivationLinks.length)]; 
  const randomMusicLink = relaxMusicLinks [Math.floor(Math.random() * relaxMusicLinks.length)]; 

  return {randomMotivLink, randomMusicLink};

}

const fetchAdvice = async () => {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();
  const advice = await data.slip.advice;

  return advice;
};

const fetchJokes = async () => {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await res.json();
  const joke = await data.setup;
  const answer = await data.punchline;

  return { joke, answer };
};

// get the admin user ID
const adminId = async () => {
  // get a list of all the members include admin and bots
  var { members } = await web.users.list();

  // filter the members and return the admin
  const admin = members.filter((member) => {
    return member.is_admin === true && member.is_owner == true;
  });
  const adminId = admin[0].id;

  return adminId;
};

async function getAdminId() {
  let admin_id = adminId();
  return admin_id;
}

const admin_id = getAdminId();

module.exports = { fetchAdvice, fetchJokes, admin_id, sendRandomMotivationLink };
