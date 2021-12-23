const request = require("request");
const baseurl = "http://localhost:4000/api/v3/stage";
const url = {
    createStage: baseurl + "/",
    addSection: baseurl + "/add/section",
};
const stageSeed = { title: "Testing Title", stageNumber: 1 };
let createdStage;
const section = {
    id: 1,
    title: "Labor market analysis",
    image: "url of image",
    stageID: "61b2c5a81cae661a2ea01319",
    description:
        "As a first step to develop a Youth Economic Empowerment (YEE) project with a gender transformative approach, an analysis of the local and national context in which the new project will be framed must be made. Specifically, this should include a business and labor market analysis, a gender analysis, and the identification of key stakeholders, including the target group.",
    // content: {
    content:
        "Before starting your YEE project it is always important to carry out a labor market analysis to ensure that your project responds to real needs and adapts to the real existing context. There is a considerable amount of tools and instruments for the analysis of market opportunities for youth employment and entrepreneurship.and the identification of relevant curricula for specific boys and girls. Plan has combined some ideas and elements from these existing tools into a market scan methodology to save time and resources for the identification and development of YEE projects. In addition, an additional challenge was raised to improve the integration of gender aspects in this market scan and in this toolbox you can find a rapid market scan instrument with a gender perspective. In this framework, it is also recommended to include, depending on specific contexts, an analysis of inclusion and job opportunities for minority groups such as Lesbian, Gay, Transgender and Bisexual (LGTB) or ethnic minorities.",
    // subContents: [
    //     " To assist in the analysis of the situation of women in the world of work and gender equality in society, there are many documents on recent trends in female employment that examine the improvements achieved in the past decade (or the lack of improvements) and assesses the prospects for the female labor market by analyzing inequalities between men and women.",
    //     " It is important to recognize that women are not only less likely than men to participate in the workforce, but when they do so, they are also more likely to be unemployed or employed in jobs that are outside of labor laws, regulations on social security and collective agreements.",
    // ],
    // },
};

// function createStage() {
//     request.post(url.createStage, { form: stageSeed }, function (err, res) {
//         console.log("created stage ....");
//         console.log(err);
//         console.log(res.body);
//         createdStage = res.body.data;
//         console.log("created stage ....");
//     });
// }
function createStage() {
    request.post(url.addSection, { form: section }, function (err, res) {
        console.log("created stage ....");
        console.log(res.body);
        console.log("created stage ....");
    });
}

module.exports = { createStage };
