import { StageProps } from './StagePage'
import {
  stage1,
  stage2,
  stage3,
  stage4,
  stage5,
  stage6,
  stage7,
  stage8,
  stage9,
} from '../../../../../Shared/Images/Images'
// export const allDummyStages: any[] = [
//   {
//     id: 1,
//     stageNumber: 1,
//     title: 'Gender-sensitive labour market analysis',
//     sections: [
//       {
//         id: 1,
//         title: 'Gender-sensitive labour market analysis',
//         image: stage1,
//         description:
//           'As a first step to develop a Youth Economic Empowerment (YEE) project with a gender transformative approach, an analysis of the local and national context in which the new project will be framed must be made. Specifically, this should include a business and labor market analysis, a gender analysis, and the identification of key stakeholders, including the target group.',
//         content: {
//           mainContent:
//             'Before starting your YEE project it is always important to carry out a labor market analysis to ensure that your project responds to real needs and adapts to the real existing context. There is a considerable amount of tools and instruments for the analysis of market opportunities for youth employment and entrepreneurship.and the identification of relevant curricula for specific boys and girls. Plan has combined some ideas and elements from these existing tools into a market scan methodology to save time and resources for the identification and development of YEE projects. In addition, an additional challenge was raised to improve the integration of gender aspects in this market scan and in this toolbox you can find a rapid market scan instrument with a gender perspective. In this framework, it is also recommended to include, depending on specific contexts, an analysis of inclusion and job opportunities for minority groups such as Lesbian, Gay, Transgender and Bisexual (LGTB) or ethnic minorities.',
//           subContents: [
//             ' To assist in the analysis of the situation of women in the world of work and gender equality in society, there are many documents on recent trends in female employment that examine the improvements achieved in the past decade (or the lack of improvements) and assesses the prospects for the female labor market by analyzing inequalities between men and women.',
//             ' It is important to recognize that women are not only less likely than men to participate in the workforce, but when they do so, they are also more likely to be unemployed or employed in jobs that are outside of labor laws, regulations on social security and collective agreements.',
//           ],
//         },

//         tools: [
//           {
//             id: 1,
//             shortTitle: 'Tools for market analysis',
//             tools: [
//               {
//                 id: 3,
//                 type: 'p',
//                 original:
//                   'Labour market policy statistics Methodology 2018 - EU',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A09%3A51.313Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 4,
//                 type: 'none',
//                 original: 'ILO-World Employment and Social Outlook-2021',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A09%3A58.481Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: 'Recent trends in female employment',
//             tools: [
//               {
//                 id: 5,
//                 type: 'g',
//                 original:
//                   'Avance global sobre tendencias empleo femenino 2018 OIT',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A18.963Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 6,
//                 type: 'g',
//                 original:
//                   'IYF- PepsiCo Summary of Situational Analysis_Mexico_2021 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A23.468Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle: 'Global Employment Trends for Youth 2020_ILO',
//             tools: [
//               {
//                 id: 7,
//                 type: 'none',
//                 original: 'Global Employment Trends for Youth 2020_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A29.202Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: 'Powering-Youth-Employment-in-SSA_Mobile Industry',
//             tools: [
//               {
//                 id: 8,
//                 type: 'none',
//                 original:
//                   'Powering-Youth-Employment-in-SSA_Mobile Industry_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A49.476Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle: 'Global Wage Report 2020-2021',
//             tools: [
//               {
//                 id: 9,
//                 type: 'none',
//                 original: 'Global Wage Report 2020-2021_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A59.846Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 6,
//             shortTitle: 'Jobs in the Orange Economy',
//             tools: [
//               {
//                 id: 10,
//                 type: 'none',
//                 original: 'Jobs in the Orange Economy_WB_2020',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A04.877Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle:
//               'S4YE Knowledge Brief 7 - Digital Jobs for Youth in FCV Settings',
//             tools: [
//               {
//                 id: 11,
//                 type: 'none',
//                 original:
//                   'S4YE Knowledge Brief 7 - Digital Jobs for Youth in FCV Settings, Click-On Kaduna_WB_2019.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A10.183Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title:
//           'Rapid mapping and scanning of youth employment and entrepreneurship',
//         description:
//           'The quick scan and other mapping instruments included in this toolbox allow the qualitative analysis of opportunities in the employment and entrepreneurship market to be developed in a participatory way to evaluate the feasibility of implementing a YEE project for youth employment in a specific country and region. , identifying the main alliances, job profiles required in the market, opportunities and threats.',
//         image: stage1,
//         content: {
//           mainContent:
//             'The rapid scan methodology allows defining the scope of the YEE project, using different methods and sources of data collection disaggregated by sex to be able to triangulate the information and analyze the differences between men and women. It also makes it possible to identify the key actors to be consulted and potentially included in the project, from target groups to Professional Technical Training (FTP) institutions, government entities and potential employer companies. It includes a quick scan of economic trends and activities with a gender perspective, an analysis of the most promising labor sectors, an analysis of the demand and supply of FTP (skills necessary to be included in the curricula, an analysis of FTP institutions and their staff) as well as potential sources of financing and income generation. The quick scan ends with a summary of the key elements to include in the YEE project.',
//           subContents: [
//             'This section not only refers to the analysis of the labor market but also to the identification of opportunities in the value chain for employment and entrepreneurship for young people, as well as for the construction of a joint vision, indicators and an improvement plan for inclusion of young women and men in entrepreneurship.',
//             'In addition to qualitative research tools, quantitative mapping and research instruments , such as the online survey , can be used to generate the necessary inputs for the development of your YEE project.',
//           ],
//         },

//         tools: [
//           {
//             id: '1.2.4 ',
//             shortTitle: 'Rising to the Youth Employment Challenge',
//             tools: [
//               {
//                 id: 12,
//                 type: 'none',
//                 original:
//                   'Rising to the Youth Employment Challenge_ILO_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A17.147Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: '1.2.5',
//             shortTitle: 'Global Gender Gap Report',
//             tools: [
//               {
//                 id: 125,
//                 type: 'none',
//                 original: 'Global Gender Gap Report 2021_WEF_2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A25.646Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Gender analysis',
//         description:
//           'Ideally, the gender approach is integrated into any market analysis or mapping of youth employment and entrepreneurship. This includes participatory methodologies for the diagnosis of the gender sensitivity of the private and public sectors in the labor market, as well as for the gender analysis of a value chain.',
//         image: stage1,
//         content: {
//           mainContent:
//             'It is important to always consider within the framework of a gender analysis the relevance and opportunity of including an analysis of mechanisms of inclusion and exclusion of minority groups, such as LGTB people or ethnic minorities.                          The analysis of a value chain with a gender perspective (ACVG) is a methodology that describes the existing gender relations in a particular environment, ranging from the home, organizations or companies, to a larger scale of community, ethnic group or All society. Organizes and interprets information on gender relations in a systematic way to clarify the importance of gender differences in achieving development objectives in a given value chain. The same methodology is also applicable to the labor market.',
//           subContents: [
//             'The tools allow conducting gender analysis in the context of any value chain or labor market sector to generate knowledge and then use the results of the analysis to inform the development of a new YEE project. Analysis of gender dynamics that prevent women from participating in and benefiting from value chains or the labor market is essential for the success of a YEE project and the overall development of value chains and labor markets.',
//             'In this section of the toolbox you can find some model Terms of Reference (ToR) for conducting a gender analysis, as well as examples of ToR used for YEE projects worldwide (see also section 1.5). It is proposed to use a mix of quantitative and qualitative methods, which can include a variety of tools, such as questionnaires, checklists , analytical frameworks (such as Harvard), empowerment indexes, analytical tree, resource mapping and others.',
//             'Users of this toolkit are encouraged to review them and apply those that are most applicable in the context in which their YEE project will be framed.',
//             "Finally, it is recommended to check whether the information generated can answer the questions expressed in Plan International's House for the Analysis of Gender and Child Rights and develop a house with the respective answers as a general framework for the future YEE project.",
//           ],
//         },

//         tools: [
//           {
//             id: 1,
//             shortTitle: 'Gender Balance Tree GALS@Scale',
//             tools: [
//               {
//                 id: 14,
//                 type: 'g',
//                 original: 'Gender Balance Tree GALS@Scale - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A59.438Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 15,
//                 type: 'g',
//                 original: 'Mayoux 2014_Rocky Road manual - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A14%3A05.714Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: 'Agriprofocus-Caja_Herramientas',
//             tools: [
//               {
//                 id: 16,
//                 type: 'g',
//                 original: 'Agriprofocus-Caja_Herramientas - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A14%3A39.479Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 17,
//                 type: 'g',
//                 original:
//                   'Agriprofocus-Toolkit Gender in Value Chains_Jan2014-G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A14%3A50.436Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 18,
//                 type: 'g',
//                 original:
//                   'FAO Desarrollo de cadenas de valor sensibles al genero - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A14%3A58.949Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 19,
//                 type: 'g',
//                 original:
//                   'FAO Developing gender sensitive value chains - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A04.670Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: 'Guidelines and criteria',
//             tools: [
//               {
//                 id: 20,
//                 type: 'g',
//                 original:
//                   'Understanding causes of gender disparities in STEM-TVET_UNESCO_2020- G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A09.227Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle: 'Impact_covid-19_girls_africa_Plan_2020',
//             tools: [
//               {
//                 id: 21,
//                 type: 'g',
//                 original: 'Impact_covid-19_girls_africa_Plan_2020 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A14.297Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 6,
//             shortTitle:
//               'Gender and Youth Employment in the Commonwealth_challenges',
//             tools: [
//               {
//                 id: 22,
//                 type: 'none',
//                 original:
//                   'Gender and Youth Employment in the Commonwealth_challenges_ILO_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A26.380Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 7,
//             shortTitle: 'GenderandyouthCIS_ILO_2020',
//             tools: [
//               {
//                 id: 23,
//                 type: 'none',
//                 original: 'GenderandyouthCIS_ILO_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A31.911Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: 'Identification of target groups and other key actors',
//         description: `Once the market has been analyzed and based on gender analysis, the potential target group of your YEE project should be defined. This population has to be specified by sex, age, ethnicity and other relevant characteristics for the context in which the future project is framed. Although YEE projects focus on youth, this can be divided into adolescents (13-17 years), recent youth (18-25 years) and older youth (25-35 years).`,
//         image: stage1,
//         content: {
//           mainContent: `It should focus on such groups that have not had the same opportunities as the rest of the population for the project to act as a catalyst for the integration of this population. These people may be in the unemployed group, but not necessarily. Special attention must be given to girls and young women in general, and indigenous women in particular, since there are several who are not even looking for work (and therefore do not enter the unemployment data) due to the obstacles they face (such as, for example, caring for your children or rejection of being pregnant). Other groups that are often “forgotten” are people who belong to the LGBTIQ community, people with a disability or single women.

//                             Once the project's target group has been defined, a mapping of other potential stakeholders or collaborators must be made, such as:

//                             Professional Technical Training (FTP) institutions that offer or could offer the necessary curricula,
//                             companies that could hire these people,
//                             government entities that have the responsibility of providing the regulatory framework or related public services,
//                             academic institutions that can conduct research on the sector with a gender perspective,
//                             non-governmental, peasant or community-based organizations that can mobilize and promote activities with the target population.
//                             The mapping of possible FTP instances as an associate of your YEE project must include a diagnosis of their capacities with a gender perspective in order to identify the most appropriate (public, private or social sector) to be strengthened with the project and serve the population. selected beneficiary. This diagnosis has to identify the instances that have the capacity and the will to successfully train young people in the required vocational and technical skills identified in the market analysis. Likewise, it has to identify the key issues for the strengthening of the most appropriate instances (public, private or social sector) in terms of, for example, improvement of their training facilities, provision of machinery, introduction of improvements to training modules. training,

//                             The mapping of multiple actors from the private, public, academic and civil society sectors is key to identify the strategic alliances that can be developed from the beginning of the project in order to achieve the sustainability of the results generated (see also stages 7 and 8).`,
//           subContents: [
//             `A possible strategic alliance could be with the Inter-American Center for the Development of Knowledge in Vocational Training (CINTERFOR) of the International Labor Organization (ILO) ( www.ilo.org/public//spanish/region/ampro/cinterfor/temas /gender/index.htm ). CINTERFOR supports vocational training bodies, develops and manages knowledge in vocational training, promotes cooperation and research, and contributes to the management of public policies on vocational training.`,
//             `Another possibility for a strategic alliance is the International Training Center of the ILO, which gives courses, among others on the subject of gender, equality and diversity ( www.itcilo.org/es/areas-de-especializacion/genero-igualdad- y-diversity? set_language = es ).`,
//           ],
//         },

//         tools: [
//           {
//             shortTitle: 'Mujeres en STEM_UNESCO_2017_SP',
//             tools: [
//               {
//                 id: 24,
//                 type: 'g',
//                 original: 'Mujeres en STEM_UNESCO_2017_SP - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A39.283Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 25,
//                 type: 'g',
//                 original: 'Mulheres en STEM_UNESCO_2017_PO - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A46.247Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 26,
//                 type: 'g',
//                 original: 'Women in STEM_UNESCO_2017_EN - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A55.038Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 27,
//                 type: 'none',
//                 original:
//                   'Youth employment from public to private sector_IDRC_2016_Ethiopia.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A03.754Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 28,
//                 type: 'none',
//                 original:
//                   'S4YE.Digital.Jobs_.for youth.with_.disabilites_WB_2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A10.208Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 5,
//         title: 'Examples and good practices',
//         description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.`,
//         image: stage1,
//         content: {
//           mainContent: `Key ILO documents, international labor standards, statistics, useful links and other resources from the ILO library can be found at the following link:  www.ilo.org/inform/online-information-resources/research-guides /lang–en/index.htm

//                             The documents are organized by topic such as youth employment: libguides.ilo.org/youth-employment-es and gender equality: libguides.ilo.org/gender-equality-es .

//                             The documents in this section are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.`,
//           subContents: [],
//         },

//         tools: [
//           {
//             id: 1,
//             shortTitle: 'ILO World Employment',
//             tools: [
//               {
//                 id: 29,
//                 type: 'p',
//                 original: 'ILO World Employment Social Outlook - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A15.304Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 30,
//                 type: 'none',
//                 original: 'OIT Perspectivas Sociales Empleo Mundo.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A20.997Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               'Examples. market analysis skills for youth in mogadishu',
//             tools: [
//               {
//                 id: 31,
//                 type: 'none',
//                 original:
//                   'Examples. market analysis skills for youth in mogadishu.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A25.540Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle: 'OIT Futuro mejor mujeres trabajo',
//             tools: [
//               {
//                 id: 32,
//                 type: 'g',
//                 original: 'OIT Futuro mejor mujeres trabajo - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A32.124Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 33,
//                 type: 'g',
//                 original:
//                   'Standars for collection sex-disaggregated data_CGIAR 2013 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A43.038Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 34,
//                 type: 'g',
//                 original:
//                   'Towards a better future-women in work_ILO_2017 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A48.306Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 35,
//                 type: 'g',
//                 original:
//                   'USAID_spring_bangladesh_womens_empower_index_2017 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A02.027Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 36,
//                 type: 'g',
//                 original: 'WEAI-Intervention_Guide_2016 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A08.170Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     stageNumber: 2,
//     title: 'Design and delimitation of your YEE project',
//     sections: [
//       {
//         id: 1,
//         title: `Design and delimitation of your YEE project`,
//         description: `In this second stage, the project is designed based on the information generated in the previous stage. This needs to be done in close collaboration with the target group and the other identified stakeholders, where partnership management is a key issue at this stage.`,
//         image: stage2,
//         content: {
//           mainContent: `This stage begins with the development of a shared vision and a Theory of Change (TOK) that is needed to reach that vision. Plan International already has a ToC for YEE projects, and it is recommended to apply it as a starting point for the development of your YEE project. Also be sure to include a gender transformative approach based on Plan's gender equality criteria. The ToC includes a definition of the goals to be achieved and the selection of indicators to measure the progress and eventual achievement of these goals (see also Stage 9 on monitoring and evaluation).`,
//           subContents: [
//             `This phase also includes the elaboration of a business plan model  for your project and a description of tasks, roles and positions in the framework of carrying out your YEE project.`,
//             `Plan International has developed a series of recommendations for the design and delimitation of your YEE project that you can find in the Tools section`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: 'ES_SOYEE Theory of Change',
//             tools: [
//               {
//                 id: 37,
//                 type: 'none',
//                 original: 'ES_SOYEE Theory of Change.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A17.797Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 38,
//                 type: 'none',
//                 original: 'PT_SOYEE Theory of Change.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A22.713Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 39,
//                 type: 'none',
//                 original: 'ES_SOYEE Brochure.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A28.038Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 40,
//                 type: 'none',
//                 original: 'PT_SOYEE Brochure.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A33.160Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 41,
//                 type: 'none',
//                 original: 'ES_SOYEE.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A38.278Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 42,
//                 type: 'none',
//                 original: 'PT_SOYEE.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A51.692Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 43,
//                 type: 'none',
//                 original:
//                   'How To Note Issue 1_How To Include Youth Voice In Youth Employment Programs_WB_2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A02.855Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 44,
//                 type: 'none',
//                 original:
//                   'S4YE Knowledge Brief 10.Youth Employment Programs and COVID_WB_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A07.360Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               'Promocion de la Iniciativa Empresarial y el Empleo de Jovenes en LAM_OIT_2015',
//             tools: [
//               {
//                 id: 45,
//                 type: 'p',
//                 original:
//                   'Promocion de la Iniciativa Empresarial y el Empleo de Jovenes en LAM_OIT_2015 - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A12.279Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 46,
//                 type: 'p',
//                 original:
//                   ' Promocio╠ün del Emprendimiento y la Innovacio╠ün Social Juvenil en America Latina_OIT_2016 - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A17.395Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle: 'LSCE Conceptual and Programmatic Framework_EN',
//             tools: [
//               {
//                 id: 47,
//                 type: 'none',
//                 original:
//                   ' LSCE Conceptual and Programmatic Framework_EN.pdf .pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A24.977Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 48,
//                 type: 'g',
//                 original: 'Critical factors youth empoyment_Plan_2017 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A33.987Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 49,
//                 type: 'none',
//                 original:
//                   ' Factores Cr├¡ticos Programas Empleo Juvenil Basado en Destrezas-Plan & Accenture.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A38.697Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 50,
//                 type: 'none',
//                 original: ' women_in_the_wind_Plan_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A47.607Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 51,
//                 type: 'none',
//                 original:
//                   ' Addressing Employment Obstacles for Young Syrian Refugee Women_WB_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A54.367Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle:
//               'Youth Voices Knowledge Brief Issue 11_How Technology Can Help Incorporate Youth Voice In Employment Programs_WB_2020',
//             tools: [
//               {
//                 id: 52,
//                 type: 'none',
//                 original:
//                   'Youth Voices Knowledge Brief Issue 11_How Technology Can Help Incorporate Youth Voice In Employment Programs_WB_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A57.895Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle: 'Impact Portfolio Report_WB_2017',
//             tools: [
//               {
//                 id: 53,
//                 type: 'none',
//                 original: 'Impact Portfolio Report_WB_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A03.684Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 6,
//             shortTitle:
//               'Guidelines for integrated youth employment programs_WB.pdf',
//             tools: [
//               {
//                 id: 54,
//                 type: 'none',
//                 original:
//                   'Guidelines for integrated youth employment programs_WB.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A10.648Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 7,
//             shortTitle:
//               'Stocktake of evidence on Youth Employment Programs_WBG_2018',
//             tools: [
//               {
//                 id: 55,
//                 type: 'none',
//                 original:
//                   'Stocktake of evidence on Youth Employment Programs_WBG_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A17.405Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 8,
//             shortTitle: 'S4YE.FACTBOOK_WB_2020',
//             tools: [
//               {
//                 id: 56,
//                 type: 'none',
//                 original: 'S4YE.FACTBOOK_WB_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A22.117Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 9,
//             shortTitle: 'Meeting the Challenge of Youth Unemployment _WB',
//             tools: [
//               {
//                 id: 57,
//                 type: 'none',
//                 original: 'Meeting the Challenge of Youth Unemployment _WB.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A34.919Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: `FTP Curriculum Development`,
//         description: `FTP curricula must be well prepared and meet relevant and applicable government requirements to achieve the necessary certification.`,
//         image: stage2,
//         content: {
//           mainContent: `
//                 Depending on the results of the market analysis, the identification and mobilization of the target group in Stages 1 to 3, the desired level of educational qualification and the design of the courses must be decided to be aligned with the qualification and certification frameworks. of government institutions . Various course possibilities can be considered, for example a mixed range of long and short courses leading to different levels of certification. Depending on the applicable qualification framework, both formal and non-formal training designs can be chosen that allow apprenticeship, work, work-apprenticeship, or other custom designs.

//                 The FTP curriculum offering must be relevant and aligned with the needs of:

//                 Young men and women
//                 The private sector that hires program students in decent work jobs.
//                 In addition, the participation of the private sector will be required in the development and validation of the curricula.

//                 In curriculum development, an important aspect to consider is how to break gender stereotypes and gender discrimination in TVET. For this, it is important to work on sensitizing young men and women, as well as educators and future employers, and especially addressing the awareness of young women about their rights, gender stereotypes and power relations and stimulating their empowerment. In the planning and delivery of curricula, it is also important to allow the participation of young women in the design of educational programs and activities. In this sense, it is also important to pay attention to the stereotypes of other groups such as LGTB and ethnic minorities.

//                 People who have an entrepreneurial profile, apart from being motivated, need to have a good level of self-esteem and empowerment (economic and social) to be able to face the risks and insecurity related to entrepreneurship. These factors are crucial to the success and sustainability of young people's business initiatives. Therefore, identifying the aptitude and talent for entrepreneurship  is the first step to be able to identify the people who can follow the path to entrepreneurship as the first choice of preference.

//                 To awaken interest for entrepreneurship, a sample about what entrepreneurship is can be offered to FTP education students. The development curriculum for entrepreneurship requires content and suitable methodologies to prepare students to face the dynamics of the business world, to accept and manage risk and uncertainty related to entrepreneurship and to develop the ability to make decisions and leadership required for the business management. Curricula should include specific attention to female entrepreneurship to awaken the interest of women and equip them to face entrepreneurship-related challenges that are regularly greater than those faced by men.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               'ILO_QualityApprenticeshipToolkit_I_Guide for Policy Makers_2017',
//             tools: [
//               {
//                 id: 58,
//                 type: 'none',
//                 original:
//                   'ILO_QualityApprenticeshipToolkit_I_Guide for Policy Makers_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A45.875Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 59,
//                 type: 'none',
//                 original:
//                   'Manual de Herramientas de la OIT para Aprendizajes de Calidad_Vol I para Formuladores de politiccas_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A51.408Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 60,
//                 type: 'none',
//                 original:
//                   "Outils pour des Apprentissages de Qualite_Vol I Guide de OIT a l'intention des decideurs politiques_2017.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A56.526Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               'Setting_the_agenda_the_girls_platform_for_action_Plan_2020',
//             tools: [
//               {
//                 id: 61,
//                 type: 'g',
//                 original:
//                   'Setting_the_agenda_the_girls_platform_for_action_Plan_2020 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A03.900Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               'Guia Didactica incorporaci├│n enfoque de g├®nero en formaci├│n profesional',
//             tools: [
//               {
//                 id: 62,
//                 type: 'g',
//                 original:
//                   'Guia Didactica incorporaci├│n enfoque de g├®nero en formaci├│n profesional - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A26.633Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 63,
//                 type: 'g',
//                 original:
//                   'Gender and economics training manual - UN-Women - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A33.801Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: 'Guia prevenci├│n discriminacion TVET - INSAFORP',
//             tools: [
//               {
//                 id: 64,
//                 type: 'g',
//                 original:
//                   'Guia prevenci├│n discriminacion TVET - INSAFORP - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A39.535Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 65,
//                 type: 'g',
//                 original: 'Igualdad de g├®nero, rompiendo estereotipos - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A51.210Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 66,
//                 type: 'gp',
//                 original:
//                   'OIT guia para la accion - Igualdad de ge╠ünero y no discriminacio╠ün en la gestio╠ün del empleo - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A56.535Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 67,
//                 type: 'g',
//                 original: ' Unconsious gender bias at the workplace - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A03.704Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle: 'European Entrepreneurship Competence Framework',
//             tools: [
//               {
//                 id: 68,
//                 type: 'none',
//                 original: 'European Entrepreneurship Competence Framework.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A07.800Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 69,
//                 type: 'none',
//                 original: ' Student Entrepreneurship Toolkit.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A23.240Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 6,
//             shortTitle: 'Una economia para mujeres - OXFAM',
//             tools: [
//               {
//                 id: 70,
//                 type: 'g',
//                 original: ' Una economia para mujeres - OXFAM - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A39.033Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: `Inclusion of the gender transformative approach in the project strategy`,
//         description: `Gender equality is enshrined in a wide range of international human rights frameworks and standards, including ILO conventions on workers' rights and the Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW).`,
//         image: stage2,
//         content: {
//           mainContent: `The strategy with a gender transformative approach of the YEE project is developed based on the data generated in the gender analysis of Stage 1. The strategy has to go beyond ensuring that women and men benefit equally from the project.

//                     In order to develop gender transformative interventions, the relationship between project activities and processes and the transformation of traditional gender roles must be recognized. Likewise, it is necessary to understand what a transformative approach to gender is and how it relates to other, more accommodating gender approaches. The gender equity criteria developed by Plan show a matrix ranging from No gender recognition, gender neutral, gender conscious and finally with a transformative gender approach.

//                     The matrix and other tools available in this toolbox help identify where your YEE project strategy is at and where it should be heading. The ideal is to achieve the transformation of gender roles and relationships, but it may be necessary to first start with creating gender awareness before moving forward.

//                     In all documentation developed within the framework of the project (from the proposal, theory of change, strategy with a gender perspective, progress reports, training curricula, etc.) an inclusive language must be used , and there is a variety of models and tools to such an end.

//                     The mainstreaming of a gender perspective ( gender mainstreaming , GM) is a strategy that integrates both the needs and experiences of women as men in the design, implementation, monitoring and evaluation of projects YEE. It can include transformative or gender-aware approaches or a combination of both. Strategies with a gender perspective (GM) must be specific with objectives, activities, budgets, etc. In addition, it is necessary to understand the definitions of gender, create a joint vision for gender equality and develop the appropriate strategy. This section contains some examples of methodologies frequently used in Latin America (see also section 1.3).

//                     Gender mainstreaming is not only relevant in preparing for salaried employment but also for entrepreneurship, including in rural areas. This section also presents some strategies to incorporate a gender perspective in the agricultural value chain that can be used to support young people's entrepreneurships or cooperatives in rural areas (see also section 1.3).`,
//           subContents: [
//             `The strategy with a gender transformative approach must have sufficient human and financial resources to be able to execute it. This includes developing the budgets of the YEE project (as well as of the FTP institutions, companies and other entities) with a gender perspective. The budgets with a gender approach is developed based on gender analysis and defined strategy, and should be aimed at an equitable distribution of resources. These resources refer to financial resources, material resources (computers, infrastructure) as well as human resources. The gender budget does not only mean a differentiated use by gender of certain funds but also focuses on the interaction of expenditures with other resources.`,
//             `Developing budgets with a gender approach refers to the process of conceiving, planning, approving, executing, monitoring, analyzing and auditing budgets in a gender-sensitive manner. It involves the analysis of the actual expenses and income (of the project, a company, FTP institution or other instance) in women and girls compared to the expenses in men and boys. It helps to decide how the objectives and strategies of the projects should be formulated and is a tool for the effective implementation of projects since it allows to verify if the assignments are in line with the objectives and strategies in order to obtain the desired impact.`,
//             `The specific budget or the proportion of the general budget of the FTP project / institution / company, which should be allocated to gender activities depends on the strategy developed. Furthermore, budgets are often intertwined, as not only will gender-specific activities be developed, but already planned activities can also be made more gender-sensitive (for example, by setting a quota for women's participation).`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '2.3.1 Women Economic Empowerment_CGD_2016',
//             tools: [
//               {
//                 id: 71,
//                 type: 'g',
//                 original:
//                   '2.3.0 - 9.2.0 Women Economic Empowerment_CGD_2016 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A42.721Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 72,
//                 type: 'g',
//                 original:
//                   '2.3.0 - 9.2.0 Women Economic Empowerment_CGD_2016_summary - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A49.786Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '2.3.2 Gender equality & decent work - ILO',
//             tools: [
//               {
//                 id: 73,
//                 type: 'g',
//                 original: '2.3.1.1 Gender equality & decent work - ILO - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A53.475Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 74,
//                 type: 'g',
//                 original:
//                   '2.3.1.2 Convencio╠ün sobre la eliminacio╠ün de todas las formas de discriminacio╠ün contra la mujer Espan╠âol - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A00.026Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 75,
//                 type: 'none',
//                 original: '2.3.1.3 CEDAW full convention_OHCHR.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A06.788Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 76,
//                 type: 'none',
//                 original:
//                   '2.3.11 Guideline on Inclusion of Marginalised People in TVET_GIZ_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A09.858Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 77,
//                 type: 'none',
//                 original:
//                   '2.3.12 Including Persons with Disabilities in TVET_ILO_2016.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A18.256Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 78,
//                 type: 'g',
//                 original: '2.3.13a S4YE Digital Jobs Report - WB_2018 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A23.375Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 79,
//                 type: 'g',
//                 original:
//                   '2.3.13b S4YE Digital Jobs Report - Executive Summary_WB_2018 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A33.821Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 80,
//                 type: 'g',
//                 original:
//                   '2.3.14 S4YE Knowledge Brief 8 - E-Work Opportunities for Young Women in Gaza_WB_2019 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A39.760Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '2.3.3 Gender mainstreaming in TVET Bangladesh ILO 2015',
//             tools: [
//               {
//                 id: 81,
//                 type: 'g',
//                 original:
//                   '2.3.3.10 Gender mainstreaming in TVET Bangladesh ILO 2015 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A44.266Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 82,
//                 type: 'g',
//                 original:
//                   '2.3.3.11 Gender-responsiveness-tvet-vietnam_ADB_2020 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A48.977Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 83,
//                 type: 'g',
//                 original:
//                   '2.3.3.5 Empoderamiento Econ├│mico de las Mujeres - AgriProfocus - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A51.845Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 84,
//                 type: 'none',
//                 original: '2.3.3.6 MakingWomensWorkVisibleReport_FINAL.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A55.584Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 85,
//                 type: 'g',
//                 original:
//                   '2.3.3.7 Skills Education and Training for Girls_Unicef_2018 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A00.139Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 86,
//                 type: 'none',
//                 original:
//                   '2.3.3.8 Mainstreaming Gender into Decent Work Programmes Africa_ILO_2016.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A14.374Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 87,
//                 type: 'g',
//                 original:
//                   '2.3.3.9 gender-mainstreaming-strategy-for-achieving-gender-equality-and-empowerment-of-women-girls_UNWOMEN_2018 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A18.932Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle:
//               '2.3.4 Value chain development and Gender - Agriprofocus',
//             tools: [
//               {
//                 id: 88,
//                 type: 'g',
//                 original:
//                   '2.3.4.3 Value chain development and Gender - Agriprofocus - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A22.566Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 89,
//                 type: 'g',
//                 original:
//                   '2.3.4.4 Value chain development and Gender - Agriprofocus - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A27.276Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 90,
//                 type: 'none',
//                 original:
//                   '2.3.4.5 A_business_case_for_gender_equality_NewForeSight-AgriProFocus_Dec 2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A31.168Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 91,
//                 type: 'g',
//                 original: '2.3.4.5 Gender-Toolkit in Value Chains-IDH - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A35.415Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 92,
//                 type: 'none',
//                 original:
//                   '2.3.4.6a Infographic_Women_Economic_Empowerment_Framework_ENG.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A43.474Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 93,
//                 type: 'none',
//                 original:
//                   '2.3.4.6b Infographic_Women_Economic_Empowerment_Framework_AgriProFocus_ENG Asian.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A47.145Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 94,
//                 type: 'none',
//                 original:
//                   '2.3.4.6c Infographic_Women_Economic_Empowerment_Framework_AgriProFocus_and_Fair_&_Sustainable_ESP.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A50.625Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 95,
//                 type: 'none',
//                 original:
//                   '2.3.4.6d Infographic_Women_Economic_Empowerment_Framework_FRA.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A54.825Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 96,
//                 type: 'none',
//                 original:
//                   '2.3.4.6e Empoderamento_Econo╠émico_das_Mulheres_POR.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A02.505Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 97,
//                 type: 'none',
//                 original:
//                   '2.3.4.6f Infographic_Women_Economic_Empowerment_Framework_AgriProFocus_and_Fair_&_Sustainable_Indonesian.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A06.396Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 98,
//                 type: 'none',
//                 original:
//                   '2.3.4.7a Reach_Benefit_Empower_framework_infographic_Fair_and_Sustainable_EN-_African.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A10.287Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 99,
//                 type: 'none',
//                 original:
//                   '2.3.4.7b Reach_Benefit_Empower_framework_infographic_Fair_and_Sustainable_EN-Asian.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A14.588Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 100,
//                 type: 'none',
//                 original:
//                   '2.3.4.7c Reach_Benefit_Empower_framework_infographic_Fair_and_Sustainable_FR-African.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A18.482Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 101,
//                 type: 'none',
//                 original: '2.3.4.7d Alcanc╠ºar_Beneficiar_Empoderar_POR.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A22.780Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle:
//               '2.3.5 Practical tips for communicating research findings gender-responsive',
//             tools: [
//               {
//                 id: 102,
//                 type: 'g',
//                 original:
//                   '2.3.5.2 Practical tips for communicating research findings gender-responsive - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A27.184Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 103,
//                 type: 'g',
//                 original:
//                   '2.3.5.3 Gender Seal-Principles of gender-sensitive communications - UNDP - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A30.359Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 6,
//             shortTitle: '2.3.6 Gender Budgeting - EIGE',
//             tools: [
//               {
//                 id: 104,
//                 type: 'g',
//                 original: '2.3.6 Gender Budgeting - EIGE - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A35.379Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 7,
//             shortTitle:
//               '2.3.7 Boosting_gender_equality_in_science_and_technology_UNESCO-2020',
//             tools: [
//               {
//                 id: 105,
//                 type: 'g',
//                 original:
//                   '2.3.8 Boosting_gender_equality_in_science_and_technology_UNESCO-2020 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A39.371Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: `Managing gender transformative alliances`,
//         description: `The formulation of a project with a variety of actors requires different participatory methodologies for the formation and management of public-private partnerships to ensure the inclusion of the different objectives, needs and other interests that each actor involved may have, as well as their strengths. and resources you can contribute. These participatory processes are time consuming as they lay the foundation for intensive collaboration throughout the project period and, at best, well beyond (see also section 1.4).`,
//         image: stage2,
//         content: {
//           mainContent: `For interventions to be effective, the gender perspective must be integrated not only within the program but also at the internal institutional level of the actors involved, through policies, strategies, work tools, training, and other gender structures within the entities ( companies and institutions). The actors involved are structured according to gender relations and norms in the surrounding society and (re) produce existing gender inequalities. Therefore, the gender mainstreaming strategy must include both actions at the programmatic level and at the internal institutional level. The latter must be implemented and monitored by each entity individually. Program activities are monitored globally.

//                     The creation of public - private alliances or cooperation with multiple stakeholders ( multi-stakeholder cooperation) and the establishment of networks is essential to ensure the success of entrepreneurship and youth social innovation in Latin America and must be considered from the beginning when designing a YEE project. The management of gender transformative alliances must consider at least the following three areas, and must consider the gender sensitivity of:

//                     Instances of FTP to ensure the quality of the training offer (FTP) with a gender transforming approach;
//                     Government bodies to ensure coordination with other projects and compliance with State requirements and policies;
//                     Private sector to ensure the relevance of the training offer (FTP) and other support activities for the employment of youth, as well as to ensure gender sensitive work environments.`,
//           subContents: [
//             `Gender-sensitive companies / institutions must be identified or, at a minimum, open to entering into a staff awareness and institutional strengthening process to develop the capacity to promote a gender-sensitive workplace or education with equal opportunities and benefits for women and men. One way to convince companies is to make them understand that greater equality will translate into more profits and better business ( greater equality = better business). Having more diverse teams also results in improved performance. One factor may be that diverse teams bring together multiple perspectives, allowing for a more holistic analysis of problems encountered at work. In addition, companies open to greater diversity in their staff are more likely to take advantage of the talents available in different population groups in terms of gender, ethnicity, age, and so on.`,
//             `Based on the development opportunities identified in the market scan and gender analysis, it is recommended to include in the design the management of alliances with companies in the region. On the one hand, to open spaces for articulation with production units that, due to their level of progress and consolidation, can be integrated into new markets, becoming providers of services, supplies of raw materials or products that allow increasing business opportunities. On the other hand, in relation to the employability component, to establish alliances for the employment of young people who will participate in the project. Specifically, conferences or business meetings can be sponsored for this purpose.`,
//             `Every company and institution must have and implement a formal policy regarding gender equality, and include it in the reports on human resources. A gender-sensitive work policymust provide: A nondiscrimination clause; Equal opportunities with respect to hiring, remuneration, promotion, training; Quotas of women in decision-making positions; Maternity and paternity leave; Flexible work hours; Access to child care; Gender-sensitive facilities, such as separate bathrooms, breastfeeding spaces; Safety and health, including policies against sexual harassment and an objective professional person to speak to. However, more is needed than developing formal policies and rules regarding gender: awareness and skills of staff and management must be worked on so that they are truly implemented and respected.

//                         The info-story on the gender gap in employment is recommended: what slows the advancement of women? ( www.ilo.org/infostories/es-ES/Stories/Employment/barriers-women#global-gap ) as learning or to be used in awareness-raising work with potential employer companies and other key stakeholders.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '2.4.1 Corporate Engagement - YEE Workshop 28Jan16 ADP',
//             tools: [
//               {
//                 id: 106,
//                 type: 'p',
//                 original:
//                   '2.4.1.1 Corporate Engagement - YEE Workshop 28Jan16 ADP - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A45.450Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 107,
//                 type: 'p',
//                 original:
//                   '2.4.1.3 Corporate Engagement  Partnerships Training - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A50.226Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '2.4.2 Mainstreaming gender justice approach_Oxfam Novib_english',
//             tools: [
//               {
//                 id: 108,
//                 type: 'g',
//                 original:
//                   '2.4.2.1 Mainstreaming gender justice approach_Oxfam Novib_english - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A59.236Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 109,
//                 type: 'g',
//                 original:
//                   '2.4.2.1 Mainstreaming gender justice approach_Oxfam Novib_portugues - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A04.562Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 110,
//                 type: 'none',
//                 original:
//                   '2.4.2.3 Economic gender gap by institutions-UNU-2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A10.707Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '2.4.3 Gender Equality in Academia and Research_EIGE_2016',
//             tools: [
//               {
//                 id: 111,
//                 type: 'g',
//                 original:
//                   '2.4.3.4 Gender Equality in Academia and Research_EIGE_2016 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A15.437Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 112,
//                 type: 'g',
//                 original:
//                   '2.4.3.5 Institution guidelines gender in TVET_UNESCO-2018 -G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A20.538Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle:
//               '2.4.4 Investing in Girls & Women -a Good Business - Girls Advocacy Alliance',
//             tools: [
//               {
//                 id: 113,
//                 type: 'g',
//                 original:
//                   '2.4.4.2 Investing in Girls & Women -a Good Business - Girls Advocacy Alliance - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A24.840Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 114,
//                 type: 'gp',
//                 original:
//                   '2.4.4.3 Companies as employer and gender - AgriProFocus - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A38.152Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 115,
//                 type: 'g',
//                 original:
//                   '2.4.4.4 Empoderamiento Economico de las Mujeres IADB - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A41.989Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 116,
//                 type: 'none',
//                 original: '2.4.4.5 Investment in girls_.textClipping',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A46.139Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 117,
//                 type: 'g',
//                 original: '2.4.4.5 Investment in girls_Plan-Citi_2020 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A49.007Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 5,
//         title: `Baseline of the project with a gender perspective`,
//         description: `Once the project has been designed with its theory of change (or logical framework) and indicators with a gender perspective (see stage 9), the baseline of the YEE project with a gender perspective must be developed before starting the project activities.`,
//         image: stage2,
//         content: {
//           mainContent: `The baseline study provides a photograph of the initial situation, which can be repeated in the middle of the period and when the project has finished to evaluate the impact of the activities carried out and the fulfillment of the goals set.`,
//           subContents: [
//             `The baseline investigation must use both quantitative and qualitative methods to report on the current status of the indicators and facilitate their understanding from the point of view of the target population and other actors involved in the project to be developed. At the end of the day, the project is developed for the benefit of the target population and it is that population with the other actors involved that must ensure the sustainability of the results to be measured at the end of the interventions, applying the same research methods as during the baseline.

//                         `,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '2.5.1 S4YE Baseline Report 2015_Full Report_WB',
//             tools: [
//               {
//                 id: 118,
//                 type: 'none',
//                 original: '2.5.2a S4YE Baseline Report 2015_Full Report_WB.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A56.388Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '2.5.2 S4YE Baseline Report 2015_Summary_WB',
//             tools: [
//               {
//                 id: 119,
//                 type: 'none',
//                 original: '2.5.2b S4YE Baseline Report 2015_Summary_WB.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A26%3A03.754Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     title:
//       'Formalization of alliances with target groups and mobilization of local actors',
//     stageNumber: 3,
//     sections: [
//       {
//         id: 1,
//         title: 'Marketing, communication and convocation of young people',
//         description:
//           'In stage 3, the implementation of the YEE project focused on youth employment and entrepreneurship is prepared. Well-defined selection criteria, a good call for groups of beneficiaries in alliances with other actors, and good marketing and communication about the project to all interested parties, are key to building an effective commitment with groups of beneficiaries and partners in the provision of training services that in turn are key to the success of the next stages of implementation of your YEE project.',
//         image: stage3,
//         content: {
//           mainContent: `The alliance with the target groups begins with a good call of young people. To this end, some methodological guidelines are included to develop a process for convening and selecting young people in the communities from a friendly and inclusive perspective. It describes the activities, the product, the methodology, aspects to be taken into account, the duration and the necessary materials.

//                     In this sub-stage it is important that interested people obtain a clear understanding of the route to employment or entrepreneurship, the successive phases of training and support offered by the project and the duration of each phase so that young people can make a decision. informed when committing to the project. It is also important to clearly communicate the selection criteria to enter the project. To this end, some examples of marketing and communication tools are included here . These examples can be used to create your own presentation materials that clearly explain the design, objectives and goals of your YEE project.

//                     The call and comprehensive understanding of the project from the beginning are a key to the success of the project. A greater investment of time for this initial phase saves time in the later stages. The use of technologies (internet, social networks) to speed up this process. Some aspects to take into account in the process of summoning participants are:`,
//           subContents: [
//             `Involve actors of various levels : Actively involve state actors that work with a population similar to that of the project, local governments, companies in the area, community-based organizations and peasant organizations, in order to facilitate the dissemination and call, as well as with local and national media, to publicize the project and its scope to the community. All of these stakeholders should be identified in the Stage 1 stakeholder mapping.`,
//             `Involve community leaders to reach vulnerable young people who are no longer in the school system, people with disabilities, young mothers, and others who may face obstacles in seeking and finding employment without specific help. It is recommended to develop a schedule of meetings with women and men leaders in the targeted area.`,
//             `Develop presentation material especially focused on these vulnerable youth groups with adapted language and using communication media that reach those specific groups. This may mean that information has to be developed in local indigenous languages, as in several places there is still less use of Spanish by women.`,
//             `Include in the call process,  activities and tools both in the field and through mass media , such as: design of advertising materials and pieces; use of media such as radio, social networks, press and the web; distribution of announcement materials such as banners, posters, flyers, brochures.`,
//             `Convene the mothers, fathers and couples of young people so that they can understand the benefits of the project and commit to supporting the participants.

//                         `,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '3.1.1 How To Note Issue 2_How To Design An SMS Outreach Strategy In Youth Employment Programs_WBG_2021',
//             tools: [
//               {
//                 id: 130,
//                 type: 'none',
//                 original:
//                   '3.1.5 How To Note Issue 2_How To Design An SMS Outreach Strategy In Youth Employment Programs_WBG_2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A17.076Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: 'Registration and selection of participants',
//         description: `The registration and selection criteria and final evaluation of the participants must be well documented and communicated. There are instruments and formats for recording basic information on each participant that can also serve as a baseline for monitoring and evaluating the YEE project (see also stage 9 M&E). For the process of selecting participants, the evaluation criteria and their respective weighting must be clearly defined and communicated to young people in advance.`,
//         content: {
//           mainContent:
//             'The selection criteria or their weighting must be adjusted according to the specific situation of each country. For example, giving more weight to young women, young people who are already mothers or fathers, young people with ongoing ventures, young people with a disability or of a certain ethnic origin according to the priorities and strategy of their organization. Gender analysis (Stage 1) can demonstrate the need for affirmative actions such as establishing higher participation quotas for young women in order to level existing inequalities. This requires the development of a specific strategy for convening, registering and selecting the group identified as disadvantaged.',
//           subContents: [
//             `It is recommended to give the project information and the registration form to the young person so that they can reflect and return it at another time. Participation in the project implies commitment on the part of the beneficiaries (time and expenses) and therefore has to be well thought out. In this box you can find various vocational exams / tests to find out the careers compatible with the profile of each young person (see section 2.2).`,
//             `In order to facilitate the registration of people interested in participating in the YEE project, it is recommended to offer the registration form online . In order not to exclude people without internet access, it is also necessary to have other registration systems. Likewise, it may be necessary to offer help with registration to certain groups, especially in the case of young people from ethnic groups who do not speak Spanish or Portuguese well enough.`,
//             `It is important to formalize the mutual commitment between your organization and the participant . For this purpose, there are examples of agreements between providers and recipients of services in the framework of YEE projects.`,
//           ],
//         },
//         image: stage3,
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '3.2.1 Demand Driven Training_Making Cents_Rockefeller Foundation_2017',
//             tools: [
//               {
//                 id: 131,
//                 type: 'none',
//                 original:
//                   '3.2.3 Demand Driven Training_Making Cents_Rockefeller Foundation_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A20.969Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Youth retention strategies',
//         description:
//           'This section presents documents and tools for youth retention strategies, including risk identification, monitoring youth and ensuring good accompaniment during the YEE project.',
//         image: stage3,
//         content: {
//           mainContent: `
//                     Here you can find instruments for the identification of dropout  risks that young people may face in the different stages of the YEE project and to assess their probability and impact, and identify actions to mitigate them. An analysis differentiated by gender, identifying specific risks that affect young women and men, allows a better focus on mitigation actions.

//                     The risks young people face can lead to desertion from the project. Instruments and technical guidelines for the retention of young people  aim to promote comprehensive quality in continuous improvement as a process of change and educational transformation in institutional and pedagogical practices. It also allows the development and strengthening of capacities in the educational actors themselves, in the generation of collaboration networks between teachers and study centers, in the leadership of the directive and technical teams, as well as for the definition of strategic lines of prevention of school dropout .

//                     One of the key aspects to prevent desertion is the accompaniment of the participants. Therefore, it is recommended to keep a record of the accompaniment activities for young people, and the commitments and agreements that result from this accompaniment. This should include the involvement of the family or other people related to the young people. If the family is aware of the project and of the commitments and benefits for the young person, the retention percentage is higher.

//                     Some other recommendations are: Zoning technical vocational training , locating the training in a central place between 3 to 4 communities to facilitate the participation of young men and women, and at the same time avoid training in the same place too many people with the same competencies saturating the local market. Likewise, constant monitoring of youth participation must be carried out (see also Stage 9 of Monitoring and Evaluation).

//                     Specific strategies to ensure the inclusion and retention of vulnerable women and youth are important to ensure that your YEE project can benefit these groups to the same extent as men. The following actions are recommended to achieve a majority participation of adolescent and young women in YEE projects:

//                     Involve and commit the young woman's family and partner in the sensitization process so that they provide the necessary support for their participation in the project.
//                     Organize focus groups with young women on the limitations and conditions necessary to participate in the project and develop actions to facilitate their participation.
//                     Address the particular needs of young women with children, providing benefits for care, early stimulation projects for children from 0 to 3 years, allowance for travel expenses, among others.
//                     Choose spaces where there are childcare services, such as schools where Plan already has childcare activities for children, to facilitate proper care for mothers and babies.
//                     Organize activities in daylight hours and a short distance from the community. Plan the time and frequency of the trainings in order to allow young women with children to participate.
//                     Secure transportation if possible or provide training on transportation security measures. In case of events (employment forums, youth leaders forum), rent transportation for participants.
//                     Research and offer technical training on income generation options that produce added value or access to quality employment specifically for women.
//                     Incorporate life skills training: self-esteem, empowerment, gender equality, sexual and reproductive health, new masculinities and life project, which allow generating awareness in young people in terms of gender roles, and creating capacities in terms making decisions about your own life (see Stage 4).
//                     Include psychosocial support in the project.
//                     In areas of social violence, it is necessary to organize spaces for reflection among the young participants to face the conditions of violence and the identification of alternatives to face them. Special attention must be paid to gender-based violence. In these areas, it is important to also take the following actions:

//                     Preparation of maps of risks and social violence and maintain permanent updating.
//                     Involvement of key actors in the project. In the case of El Salvador, local governments have been a relevant factor for the inclusion of young people in areas with a high incidence of violence; They have provided complementary resources for the implementation of the project.
//                     Support during the processes of awareness, convocation and execution of the project in community-based organizations and community leaders.
//                     Previous individual and group work is suggested to bring these people (who face situations of violence) closer to the project, promoting their leading role, providing them with volunteer roles and facilitating their self-esteem (see also Stage 4).
//                     Bring the project services closer to the communities or to places, schedules and means of transport that provide safe conditions, in which young people can move without suffering any harm, physical or verbal aggression.
//                     Implement methodologies such as those of savings and credit groups, in order to generate trust among its participants and the social fabric.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTtitle: '3.3.1 Manual-Orientaciones-Retencion-Escolar',
//             tools: [
//               {
//                 id: 132,
//                 type: 'none',
//                 original: '3.3.2 Manual-Orientaciones-Retencion-Escolar-1.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A28.496Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '3.3.2 National Youth Employment Body Practice Guide_Brotherhood_2020',
//             tools: [
//               {
//                 id: 133,
//                 type: 'none',
//                 original:
//                   '3.3.4-3.1.3 National Youth Employment Body Practice Guide_Brotherhood_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A35.099Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: 'Mobilization of local actors',
//         description: `The importance of mobilizing and allying with different actors that can be important partners for the YEE project has already been emphasized several times in this and previous stages.`,
//         image: stage3,
//         content: {
//           mainContent: `n Stage 2 (in particular in section 2.3) we have already discussed the management of gender-sensitive alliances with companies and FTP institutions. Likewise, it is important to have the support of the local government, the community, especially leaders, and families. This may require gender sensitization work for which several of the guides, manuals and exercises can be used to conduct community workshops with a gender perspective . These instruments and methodologies promote reflection on the roles and stereotypes socially assigned to women and men and help to produce a culture-sensitive consensus, with women as well as with men, on the elements of behavior and identity that must be changed to promote gender justice.`,
//           subContents: [
//             `Several basic techniques of moderation and participation for group processes can be used in group events with young people, but also with communities or other actors involved in promoting employment and entrepreneurship. The moderation of group events facilitates the equitable participation of those present and the search for consensus in order to reach agreements and operational conclusions.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '3.4.1 manual taller comunitarios con g├®nero',
//             tools: [
//               {
//                 id: 134,
//                 type: 'g',
//                 original:
//                   '3.4.1 manual taller comunitarios con g├®nero - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A44.726Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '3.4.2 S4YE Brief Online Learning Models for Low Bandwidth Areas_WB_2021',
//             tools: [
//               {
//                 id: 135,
//                 type: 'none',
//                 original:
//                   '3.4.3 S4YE Brief Online Learning Models for Low Bandwidth Areas_WB_2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A55.534Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 5,
//         title: 'Examples and good practices',
//         description:
//           'In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.',
//         image: stage3,
//         content: {
//           mainContent: `The documents in this section are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '3.5.1 Jo╠üvenes Construyendo Futuro brochure digital',
//             tools: [
//               {
//                 id: 136,
//                 type: 'none',
//                 original:
//                   '3.5.2.1 Jo╠üvenes Construyendo Futuro brochure digital.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A01.316Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 137,
//                 type: 'none',
//                 original:
//                   '3.5.2.2 Jo╠üvenes Construyendo Futuro brochure impreso.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A07.668Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 138,
//                 type: 'none',
//                 original: '3.5.2.3 Jo╠üvenes Construyendo Futuro INFO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A21.592Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: 'Personal skills',
//     stageNumber: 4,
//     sections: [
//       {
//         id: 1,
//         title: 'Personal skills',
//         description:
//           'The family and educational system has been focused on human beings learning subjects organized by curricular blocks, which are qualified as a requirement to obtain academic degrees, for the future search for job opportunities. However, soft skills or Life Skills are seldom developed in formal education, despite being the ones that enable them to stay in jobs or businesses',
//         image: stage4,
//         content: {
//           mainContent: `The training of life skills provides tools to develop capacities in young people so that they can manage their personal and professional characteristics in the business field. If new modules are designed for your YEE project, they have to be to use dynamic, practical and participatory tools, based on the knowledge and skills already existing in the project's target groups. In particular, it is recommended to include the access and use of information and communication technologies to suit the current interests and needs of young people.

//                     If you want to be successful in a job or entrepreneurship, it is key that young people develop personal skills such as self-knowledge, self-esteem, gender awareness, as well as their reproductive health, human, citizen and youth rights.`,
//           subContents: [
//             `Young people also have to learn to manage their emotions , which begins with recognizing their emotions and reflecting on the behaviors that promote them. They have to learn to manage stress and tension, reviewing their emotional state in the face of situations of success and frustration.`,
//             `The development of self - knowledge includes recognizing constitutive elements of their identity, identifying their strengths and weaknesses, reflecting on the presence of gender in the construction of identity, generating tools to strengthen their self-esteem and developing an adequate attitude towards personal hygiene. .`,
//             `Self-awareness and emotion management are basic skills to strengthen self-esteem and improve performance in the workplace. One way that young people can work on developing their self-esteem is through introspection about their personal life and projection towards their career aspirations.`,
//             `Being successful in working life requires that young people become aware of the different areas of participation, beyond workshops and meetings; that they have information on legislative aspects of participation, organizational models and operating structure; and that they understand that by working together they can achieve common goals in an organized way.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '4.1.1',
//             tools: [
//               {
//                 id: 139,
//                 type: 'none',
//                 original: '4.1.1 Modulo 1 Autoconocimiento - Plan.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A26.302Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '4.2.2 Modulo 2 Manejo de emociones Plan',
//             tools: [
//               {
//                 id: 140,
//                 type: 'none',
//                 original: '4.1.2 Modulo 2 Manejo de emociones Plan.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A30.603Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               "4.3.3 Materiales de genero formacion formadores instructores SNPP - SAPE'A",
//             tools: [
//               {
//                 id: 141,
//                 type: 'g',
//                 original:
//                   "4.1.3.1 Materiales de genero formacion formadores instructores SNPP - SAPE'A - G.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A35.109Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 142,
//                 type: 'none',
//                 original: "4.1.3.2 Manual del Facilitador - SAPE'A.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A43.099Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 143,
//                 type: 'none',
//                 original: "4.1.3.3 Manual del Participante - SAPE'A.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A02.145Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: 'Skills for gender transformation',
//         description: `Part of the process of developing self-awareness and self-esteem is understanding your own gender identity and that of the people around you. This also includes understanding your sexual orientation. It involves knowing human and youth rights, but also recognizing that women and men and LGTB people face different obstacles to be able to enjoy them; In many cases, women face greater barriers than men, both in their daily life and at work.`,
//         content: {
//           mainContent: `To achieve gender equality and ensure that girls participate meaningfully in society, it is essential to challenge existing roles and stereotypes of power. Therefore, it is important to encourage boys and young men to get involved and engage in the redistribution of power in their personal lives and in public spheres. Young men must be encouraged to be advocates and agents of change for the achievement of gender equality and women's rights.

//                     At the same time, it is necessary to work on the empowerment of girls and young women so that they too are defenders and agents of change . They have to know their rights; recognize your strengths and weaknesses; develop their self-esteem so that they lose their fear of public speaking and begin to participate actively, solving problems and taking control over their own lives. In short, they have to learn to make decisions with autonomy and self-worth about aspects that affect their own life, and establish agency and power. at the three levels indicated in Plan's gender equality criteria (see section 2.3): “power over” (having authority), “power within” (having the confidence to claim their rights) and “power with” (collaborating with other people to achieve collective goals).

//                     Empowerment is also the foundation of leadership . Once young women have developed the personal skills to be leaders in their own lives, they can also acquire the skills to be leaders at work. This requires the ability to create a vision, develop strategies to achieve it, seek potential allied stakeholders, and communicate with others (see also section 2.2 on developing a gender-sensitive strategy).`,
//           subContents: [
//             `Part of this process is that young people, especially women, recognize their sexual and reproductive rights (DDSSRR) , reflect on sexuality and sexual orientation, eliminating taboos and myths around the subject, and have information on diseases of the sexual transmission and its prevention.`,
//           ],
//         },
//         image: stage4,
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '4.2.1 Fortaleciendo capacidades para la igualdad de g├®nero',
//             tools: [
//               {
//                 id: 144,
//                 type: 'g',
//                 original:
//                   '4.2.1.1 Fortaleciendo capacidades para la igualdad de g├®nero - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A16.891Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 145,
//                 type: 'g',
//                 original: '4.2.1.2 Gu├¡a de facilitaci├│n - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A22.011Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '4.2.2 Champions of Change for Gender Equality and Girls Rights- Plan International',
//             tools: [
//               {
//                 id: 146,
//                 type: 'g',
//                 original:
//                   'Champions of Change for Gender Equality and Girls Rights- Plan International - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A28.771Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 147,
//                 type: 'none',
//                 original: 'Champions of Change_Plan_2016.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A40.856Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '4.2.3 Guia practica empoderamiento de mujeres en el sector metal',
//             tools: [
//               {
//                 id: 148,
//                 type: 'g',
//                 original:
//                   '4.2.3.2a Guia practica empoderamiento de mujeres en el sector metal - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A22.637Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 149,
//                 type: 'none',
//                 original:
//                   '4.2.3.2b GUIA_PARA_EL_EMPODERAMIENTO_DE_LAS_MUJER.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A26.323Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 150,
//                 type: 'none',
//                 original:
//                   '4.2.3.5-8.1.5 Gender divide skills development_ILO_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A30.419Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle:
//               '4.2.4 Manual metodologico de escuela de liderazgo femenino-  CLAC Fair Trade',
//             tools: [
//               {
//                 id: 151,
//                 type: 'g',
//                 original:
//                   '4.2.4.5 Manual metodologico de escuela de liderazgo femenino-  CLAC Fair Trade - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A37.386Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 152,
//                 type: 'g',
//                 original:
//                   '4.2.4.6-4.2.2.4 Celebrating_changemakHERS_Citi Foundation_2019 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A57.255Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Life project planning',
//         description: `With strengthened personal skills, young men and women must formulate their life project with a vision of the future. This includes the socio-occupational orientation with the search for opportunities, the identification of personal interests and the choice of alternatives in a vocational orientation process.`,
//         image: stage4,
//         content: {
//           mainContent: `This process should include training and financial planning through the formulation of a personal budget, financial management and time management, to achieve an adequate balance at the personal, family and work level (see also the reference documents in section 4.1). Financial training must include all financial instruments, not only access to different types of credit (including cash purchases) but also the importance of having different types of insurance and saving to guarantee future personal and business actions.

//                     Young people often have a short-term vision, so it is necessary to address issues such as responsible spending and the importance of having financial reserves for investments or solving future problems on a personal level, at work or in entrepreneurship. This creates financial independence and with it the ability to make decisions about your own life.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '4.3.1 Rutas de Vida_Manual acompan╠âamiento Orientacio╠ün Socio-ocupacional 2013',
//             tools: [
//               {
//                 id: 153,
//                 type: 'none',
//                 original:
//                   '4.3.2 Rutas de Vida_Manual acompan╠âamiento Orientacio╠ün Socio-ocupacional 2013.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A12.013Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 154,
//                 type: 'none',
//                 original:
//                   '4.3.2.1 Construir Futuros Orientacion socio-ocupacional R1_MinEduCol_nd.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A23.693Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 155,
//                 type: 'none',
//                 original:
//                   '4.3.2.2 Construir Futuros Orientacion socio-ocupacional R2_MinEduCol_nd.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A29.431Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 156,
//                 type: 'none',
//                 original:
//                   '4.3.2.3 Construir Futuros Orientacion socio-ocupacional R3_MinEduCol_nd.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A38.242Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 157,
//                 type: 'none',
//                 original:
//                   '4.3.2.4 Construir Futuros Orientacion socio-ocupacional R4_MinEduCol_nd.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A45.065Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 158,
//                 type: 'none',
//                 original:
//                   '4.3.2.5 Construir Futuros Orientacion socio-ocupacional R5_MinEduCol_nd.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A54.228Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '4.3.2 Onda emprendedora manejo del dinero',
//             tools: [
//               {
//                 id: 159,
//                 type: 'none',
//                 original: '4.3.3 Onda emprendedora manejo del dinero.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A07.341Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: 'Job skills',
//         description: `Skills required for the job include the topics of communication at work and conflict management, creative thinking and problem solving, job rights and duties, and community work.`,
//         image: stage4,
//         content: {
//           mainContent: `First, young people must know the importance of good communication for the development of an efficient and effective work environment and identify ways to deal with conflict. This requires acquiring skills to communicate assertively and effectively, promote environments of respect and tolerance, enhance leadership and teamwork, identify power dynamics in the work environment, and adequately handle conflicts and personal relationships in general.

//                     It must be taken into account that much of the communication between people is not transmitted only with verbal language, but also with gestural and written language. You must take care of all these types of language to avoid conflicts in different areas of life.`,
//           subContents: [
//             `The creative thinking and openness are key elements for a proper understanding of problems and situations that arise in daily life and to make the right decisions.

//                         The development of an enterprise also requires an entrepreneurial spirit and specific psychosocial characteristics. Young entrepreneurs must understand the dimension of their productive activity, the success factors and limitations that arise in their own ventures, and develop the skills that allow them to project themselves in a sustained way in the market.

//                         Young people also need to know about the labor and tax laws and rights of their country and the institutions that govern these issues. These are also important insights for contractual employment relationships . Young people must have knowledge about the elements that make up the individual work relationship. They have to know about rights and duties, benefits and requirements, the functioning of the social security system, codes of conduct and internal work regulations, evaluation and self-evaluation of work performance, safety and health at work.`,
//             `At the end of the life skills training, the process must be evaluated in order to make a quality control of the training, identify the positive aspects and critical points, as well as the pending actions based on the improvement of the training. For the same purpose, it serves to assess the level of appropriation of knowledge in life skills.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               "4.4.1 Ready For Work youth life skills curriculum - work preparedness - Trainer's Guide - Plan International",
//             tools: [
//               {
//                 id: 160,

//                 type: 'none',
//                 original:
//                   "4.4.1 Ready For Work youth life skills curriculum - work preparedness - Trainer's Guide - Plan International.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A13.283Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 161,
//                 type: 'none',
//                 original: '4.4.1.2a Skills gap_WB_full.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A26.194Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 162,
//                 type: 'none',
//                 original: '4.4.1.2b Skills Gap_WB_summary.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A38.487Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '4.4.2 Modulo 3. Relaciones sociales - Plan',
//             tools: [
//               {
//                 id: 163,
//                 type: 'none',
//                 original: '4.4.2.1 Modulo 3. Relaciones sociales - Plan.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A45.456Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle: '4.4.3 Modulo 4. Pensamiento Creativo - Plan',
//             tools: [
//               {
//                 id: 164,
//                 type: 'none',
//                 original: '4.4.3 Modulo 4. Pensamiento Creativo - Plan.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A50.165Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: '4.4.4 Modulo 7. Espiritu emprendedor - Plan',
//             tools: [
//               {
//                 id: 165,
//                 type: 'none',
//                 original: '4.4.4 Modulo 7. Espiritu emprendedor - Plan.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A54.468Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle: '4.4.5',
//             tools: [
//               {
//                 id: 166,
//                 type: 'none',
//                 original: '4.4.5 Modulo 5. Relaciones Laborales - Plan.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A57.952Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 5,
//         title: 'Orientation and tutorial',
//         description: `An important element in the development of life skills is the accompaniment of people through guidance (coaching) and mentoring. Ideally, orientation and tutoring begin in this fourth stage and continue during vocational / professional training (stages 5 and 6) and even during post-school time at work or in one's own company (stage 7).`,
//         image: stage4,
//         content: {
//           mainContent: `There are different contexts and settings in which guidance and mentoring can be given. One modality is to establish and develop mentoring mechanisms among young women and men themselves. This is called ' peer review ' ( peer review ). The exchange of experiences between young people in practice can be a very strong support for individual students in the process of recognizing and facing challenges and solving practical problems. Gender aspects in education and work should also be touched on in this peer review, either in pairs or in groups of the same gender or in mixed groups.

//                     Another modality is the tutoring of students by their educators . The training of educators in mentoring methodologies and practices with a gender transformation approach is a necessary phase to ensure the effectiveness of mentoring in practice.`,
//           subContents: [
//             `The guidance and mentoring by supervisors are important instruments for vocational training and empowerment of individuals and post-graduate students during their practices and internships, as well as in the context of employment. In the event that post-graduates do not continue their career in a work context (salaried employment) and opt for a career as an entrepreneur, this mentoring option by the employing company does not exist, but they can choose to continue the Peer review among entrepreneurs as colleagues and / or mentoring by external tutors may be considered. In addition, small and medium-sized enterprises can be involved in orientation programs.`,
//             `In the counseling and mentoring process, gender and age relationships inherently introduce a challenge of keeping a balance of power. On the one hand, taking advantage of the accumulated experience of female or male tutors / mentors is necessary to accompany the person with less experience. On the other hand, tutors / mentors must ensure that the person who receives their support, follows an empowerment process that allows them to assume responsibility in making their own decisions. An imbalance of power in mentoring and mentoring relationships can easily distort the results of these processes. That is why it is important to raise awareness and train tutors and mentors in handling aspects of power, gender and age, in the orientation and mentoring process (see also section 2.4).

//                         In the selection of tutors / mentors, their sensitivity to gender issues must be taken into account , but also their gender itself, since the use of tutors / mentors (women) can generate trust among female students / interns / employers.`,
//             `Another form of accompaniment is labor intermediation , which can be carried out by tutors or mentors, but also by other actors such as a public or private service. Intermediation may include the organization of job fairs or exchanges, the creation of a database on young people seeking employment and companies offering employment, or the direct establishment of contacts between young people and employers. Like mentoring and guidance, intermediation becomes more important in times of transition (for example, from school to technical training, from FTP to first job, from one job to another, but also at the time of having a job). son / daughter).`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '4.5.1 Digital-Skills-Toolkit',
//             tools: [
//               {
//                 id: 167,
//                 type: 'none',
//                 original: 'Digital-Skills-Toolkit.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A01.848Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '4.5.2  Programa de Mentoria',
//             tools: [
//               {
//                 id: 168,
//                 type: 'none',
//                 original: '4.5.2.1 Programa de Mentoria.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A16.393Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 169,
//                 type: 'none',
//                 original:
//                   '4.5.2.5 Guia Orientacion Socio-ocupacional_docentes_Bogota_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A20.425Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 170,
//                 type: 'none',
//                 original:
//                   '4.5.2.6 Secuencia Didactica Orientacion Socio-ocupacional_docentes_Min Edu Col_Dic 2015.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A26.638Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '4.5.3 Engaging employers in Apprenticeships opportunities - OECD',
//             tools: [
//               {
//                 id: 171,
//                 type: 'p',
//                 original:
//                   '4.5.3.1 Engaging employers in Apprenticeships opportunities - OECD - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A32.988Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 172,
//                 type: 'p',
//                 original:
//                   '4.5.3.2 Toolbox for Apprenticeship Coaches- Increase Apprenticeships in SMEs - AC4SME - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A38.520Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: '4.5.4 Enfoque de genero TUI Academy - G & P',
//             tools: [
//               {
//                 id: 173,
//                 type: 'gp',
//                 original: '4.5.4.1 Enfoque de genero TUI Academy - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A44.692Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 174,
//                 type: 'g',
//                 original:
//                   '4.5.4.2 Handbook for Youth Workers-Gender-LGBTIQ-2016-EU - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A48.398Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle:
//               '4.5.5 Handbook of ICT practices for guidance and career development',
//             tools: [
//               {
//                 id: 175,
//                 type: 'none',
//                 original:
//                   '4.5.5.1 Handbook of ICT practices for guidance and career development.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A53.067Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 176,
//                 type: 'p',
//                 original:
//                   '4.5.5.3 Skills needs anticipation assessments and approaches - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A03.824Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 177,
//                 type: 'g',
//                 original:
//                   '4.5.5.4--5.6.2.3 Empowering rural women through ICT in TVET_UNESCO_2017 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A09.662Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 6,
//         title: 'Examples and good practices',
//         description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.`,
//         image: stage4,
//         content: {
//           mainContent: `The documents are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.`,
//           subContents: [],
//         },
//         tools: [],
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: 'Educating for employability',
//     stageNumber: 5,
//     sections: [
//       {
//         id: 1,
//         title: 'Educating for employability',
//         description: `The key objective of technical education and vocational training is to equip young people with skills relevant to the labor market and prepare them for salaried employment.
//                 In this phase, there are 6 key steps that must be followed to develop good quality and relevant technical and / or vocational education for young men and women.`,
//         image: stage5,
//         content: {
//           mainContent: `Having a quality, gender-transformative FTP curriculum alone is not enough to ensure that FTP will produce the desired results. It is also important to select and recruit the right people with the right mindset (or potential) to deliver gender transformative training in the classroom. This also requires human resource policies to ensure that there is a gender balance in teaching staff and administration. It will also require more training for FTP teaching staff in education and youth empowerment with a gender transformative approach, including sensitivity regarding the inclusion and exclusion of LGTB people, ethnic minorities or people with specific religious beliefs.

//                     To understand the 6 steps to follow in this Stage, we recommend reviewing the tools and sections identified in the Table of Contents.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '5.1.1 Thematic brief gender, education and training',
//             tools: [
//               {
//                 id: 178,
//                 type: 'g',
//                 original:
//                   '5.1.2.6 Thematic brief gender, education and training - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A15.314Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 179,
//                 type: 'none',
//                 original:
//                   '5.1.2.7 Rights@work 4 youth_facilitator guide_ILO_2016.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A20.238Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title:
//           'Internships, professional practices and apprenticeship in work practice',
//         description: `A basic element of technical-vocational education is the realization of internships and professional practices. Depending on the national context, qualification frameworks, economic sectors and the labor market (formal and informal) there is a variety of models and methodologies for exposing students to the reality of work, through internships, internships, combined learning paths and work. For the realization of effective internships it is very important to prepare and instruct employers to receive and supervise their apprentices and to ensure a good accompaniment during the time of the internship.`,
//         image: stage5,
//         content: {
//           mainContent: ``,
//           subContents: [
//             `In preparing apprentice supervisors, attention should be paid to gender and age sensitivity in supervisory and mentoring relationships, and avoiding gender stereotypes in these processes. At the same time young people need to be prepared and instructed for internships . Also the students must be prepared in the aspects and relations of gender and the influence of age in tutoring relationships. A specific aspect is gender violence at work and the risk of violence when there are highly unequal power relations. Projects / initiatives must have a provision / instance to report cases of gender violence in a very accessible and safe way.

//                     There are forms of Professional Technical Training (FTP) that are developed in work practice in companies. The trainers in this case are not teachers but are owners, managers or other workers in companies. This form of FTP is called in English ' apprenticeship ' or in Spanish it generally refers to the professional learning model . In this model, the FTP institutes and the Ministry of Education are involved in the quality control of training and its certification but not, or very modestly, in classroom training.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               "5.2.1 Outils pour des Apprentissages de Qualite_Vol 2_Guide de l'OIT a l'intention des praticiens_2020",
//             tools: [
//               {
//                 id: 180,
//                 type: 'none',
//                 original:
//                   "5.2.0 - 5.3.0 - Outils pour des Apprentissages de Qualite_Vol 2_Guide de l'OIT a l'intention des praticiens_2020.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A32.404Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 181,
//                 type: 'none',
//                 original:
//                   '5.2.0 - 5.3.0 ILO Toolkit for Quality Apprenticeships_Vol2_Guide for practitioners_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A43.877Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 182,
//                 type: 'none',
//                 original:
//                   '5.2.0 Quality Apprenticeship Toolkit for LAC_ILO_2019.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A57.603Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '5.2.2 A step-by-step guide to promote quality apprenticeships',
//             tools: [
//               {
//                 id: 183,
//                 type: 'p',
//                 original:
//                   '5.2.1.1 ILO  A step-by-step guide to promote quality apprenticeships - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A02.520Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 184,
//                 type: 'p',
//                 original:
//                   '5.2.1.2 ILO Manual de herramiento (OIT) para los aprendizajes de calidad - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A09.076Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle: '5.2.3 Promoting adult learning in the workplace',
//             tools: [
//               {
//                 id: 185,
//                 type: 'none',
//                 original:
//                   '5.2.2.3 Promoting adult learning in the workplace.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A15.307Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 186,
//                 type: 'none',
//                 original:
//                   '5.2.2.4 Decent work for women_into_the_light_Plan_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A21.574Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: '5.2.4  Long-term apprenticeship model appraisal',
//             tools: [
//               {
//                 id: 187,
//                 type: 'none',
//                 original:
//                   '5.2.4.3 Long-term apprenticeship model appraisal.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A34.274Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 188,
//                 type: 'none',
//                 original: '5.2.4.5 Cashing_In_Business_Case_Summary_Report.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A37.922Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle:
//               '5.2.5 Brief_Transportation Costs and Youth Employment_WB_2018',
//             tools: [
//               {
//                 id: 189,
//                 type: 'none',
//                 original:
//                   'S4YE Brief_Transportation Costs and Youth Employment_WB_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A51.073Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: `Monitoring and evaluation of FTP curricula, internships and apprenticeship in work practice`,
//         description: `The TVET student examination must follow the grading frameworks and formal certification levels. An increasingly important aspect in the examination and evaluation of student performance (in the formal curriculum and also in internships) is the evaluation of students' skills and behavior in the workplace.`,
//         image: stage5,
//         content: {
//           mainContent: `There is a wide range of models and methodologies for   the management and evaluation of competencies. The evaluation of people's behavior and gender awareness is also important to ensure that the learning processes and internships not only produce technical and professional skills but also life skills and transformation of gender relations in the world of work.`,
//           subContents: [
//             `Examination of students is not sufficient to measure the success and quality of the professional technical learning process. It is also important to carry out evaluations of satisfaction from the perspective of students with the curricular offer, the performance of their teachers and the management of the training process. In measuring satisfaction, it is important to disaggregate data for men and women, since it is very likely that there is considerable variety in opinions and satisfaction between`,
//             `Last but not least, it is necessary to evaluate the satisfaction of employers with the curricular offer and the performance of students in their internships and the relevance and quality of their skills for job placement. The measurement of employer satisfaction should also include gender aspects and measure whether in practice the awareness and behavior of employers regarding gender relationships and stereotypes have changed.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '5.3.1 Encuestas a empleadores sobre graduados de educacion que contratan',
//             tools: [
//               {
//                 id: 190,
//                 type: 'p',
//                 original:
//                   '5.3.3.1 Encuestas a empleadores sobre graduados de educacion que contratan - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A55.006Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '5.3.2 Guide to International Labour Standards and Rights Young People_ILO_Dec 2017',
//             tools: [
//               {
//                 id: 191,
//                 type: 'none',
//                 original:
//                   '5.3.4 Guide to International Labour Standards and Rights Young People_ILO_Dec 2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A59.677Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title:
//           'Orientation (coaching) and Tutoring (mentoring) in work situations',
//         description: `An important element of the educational process, both during the time spent in class and the time spent in exposure and practice of the labor and business world, is the accompaniment of young people through guidance (coaching) and mentoring.`,
//         image: stage5,
//         content: {
//           mainContent: ``,
//           subContents: [
//             `Guidance and tutoring are not limited to school time, but can also extend to the time prior to entering the vocational technical training institution (FTP) and to post-training time at work or in one's own company. For this reason, we have included the guidance and mentoring in the Life Skills Stage (section 4.5) as well as the tools.`,
//           ],
//         },
//         tools: [],
//       },
//       {
//         id: 5,
//         title: 'Preparation to enter the labor market',
//         description: `As they reach the end of their school career, students should prepare to apply for a job. Before this phase, they have generally already carried out work internships or internships, for which an application process for the positions is usual. Training and accompanying students in preparing their Curriculum Vitae (CV) and application letters are essential to improve the success rate of obtaining jobs (or internships / internships).`,
//         image: stage5,
//         content: {
//           mainContent: `A specific aspect in the preparation of job applications and also to prepare for the selection interviews, is to know yourself and to know how to formulate and present in a clear and forceful way your technical / vocational skills and (perhaps even more important ) their competencies and life skills. For the majority of candidates, the selection interviewsthey produce a lot of stress, which must be managed and controlled once in a real situation. However, stress can be reduced by preparing well, such as reviewing available information on the job profile and practicing beforehand with someone else. Knowing yourself and having self-confidence in your abilities are also very important characteristics for a successful job application (see also stage 4).

//                     Once the person is inserted into work life, performance interviews should be a regular practice. These interviews can be very frequent at the beginning, specifically during the probationary period, and as the person has been on the job longer, the frequency can decrease up to once a year. In all cases, it is important to have a good preparation for performance interviews and for this purpose there are some relevant tools and methodologies.`,
//           subContents: [
//             `Career planning and continuing education are other important aspects of job placement and these require a proactive attitude from people to improve their professional and work performance, and improve their future job prospects.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '5.5.1 Processo seletiva - dicas aos jovens.pdf',
//             tools: [
//               {
//                 id: 192,
//                 type: 'none',
//                 original: '5.5.2.2 Processo seletiva - dicas aos jovens.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A04.184Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 6,
//         title: 'Labor mediation services',
//         description: `More and more technical and vocational education institutes include mediation services to their students and the private sector in their offer.`,
//         image: stage5,
//         content: {
//           mainContent: `The labor mediation services  may include services to find suitable staff and well prepared for jobs full time or on temporary contracts, part - time and / or flexible. One aspect of these services is the application of non-discrimination mechanisms at work and ensuring that men and women have equal opportunities to find work with equitable payments. In some cases, affirmative actions (positive discrimination) can also be considered to improve access to work for women, ethnic groups, people with disabilities or young people and break stereotypes.

//                     Labor mediation also includes services for students and postgraduates in managing a database of jobs, support in mediation and hiring, in matters of insurance and social benefits, etc.

//                     `,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '5.6.1 Handbook of ICT practices for guidance and career development',
//             tools: [
//               {
//                 id: 193,
//                 type: 'none',
//                 original:
//                   '5.6.1.3 Handbook of ICT practices for guidance and career development.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A08.896Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '5.6.2 Women in ICT_promising practice_UNESCO_2021',
//             tools: [
//               {
//                 id: 194,
//                 type: 'g',
//                 original:
//                   '5.6.2.3-4.5.5.4 Women in ICT_promising practice_UNESCO_2021 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A19.344Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '5.6.3 Jobs Interventions for Young Women in the Digital Economy_WB_2020',
//             tools: [
//               {
//                 id: 195,
//                 type: 'g',
//                 original:
//                   '5.6.3 - 5.5.5 Jobs Interventions for Young Women in the Digital Economy_WB_2020 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A31.054Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle:
//               '5.6.4 Using Artificial Intelligence for Job Matching Platforms_S4YE Webinar_WB_2020',
//             tools: [
//               {
//                 id: 196,
//                 type: 'none',
//                 original:
//                   '5.6.4 Using Artificial Intelligence for Job Matching Platforms_S4YE Webinar_WB_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A35.014Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 7,
//         title: 'Examples and good practices',
//         description: `n this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.`,
//         image: stage5,
//         content: {
//           mainContent: `The documents are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.

//                     `,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '5.7.1 Apprenticeship schemes in European countries A cross-nation overview',
//             tools: [
//               {
//                 id: 197,
//                 type: 'p',
//                 original:
//                   '5.7.1.0 Apprenticeship schemes in European countries A cross-nation overview - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A41.881Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 198,
//                 type: 'p',
//                 original:
//                   '5.7.1.2 Apprenticeship Framework Analysis Europe - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A45.770Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 199,
//                 type: 'none',
//                 original:
//                   '5.7.1.3 Analysis and overview of NQF level descriptors in European countries.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A53.554Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 200,
//                 type: 'p',
//                 original:
//                   '5.7.1.5 Labour market impact of National Qualification Frameworks in six countries - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A58.676Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 201,
//                 type: 'none',
//                 original:
//                   '5.7.1.6 Towards Competence-Based Technical-Vocational Education and Training in Ethiopia.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A37%3A02.978Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 202,
//                 type: 'none',
//                 original: "5.7.1.9 Manual del Facilitador - SAPE'A.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A37%3A07.895Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: "5.7.2 Manual del Participante - SAPE'A",
//             tools: [
//               {
//                 id: 203,
//                 type: 'none',
//                 original: "5.7.2.0 Manual del Participante - SAPE'A.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A39%3A07.872Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 204,
//                 type: 'gp',
//                 original:
//                   '5.7.2.4 Women in the Workplace 2017 - Mc Kinsey - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A39%3A39.797Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 205,
//                 type: 'gp',
//                 original:
//                   '5.7.2.5 Breaking with gender stereotyping in a tuna factory in Solomon Islands - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A40%3A10.044Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 206,
//                 type: 'p',
//                 original:
//                   '5.7.2.6 bridging the gap - the role of private sector in TVET and employment creation - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A40%3A32.928Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '5.7.3 Educaci├│n T├®cnico Profesional y Equidad de G├®nero en Chile',
//             tools: [
//               {
//                 id: 207,
//                 type: 'g',
//                 original:
//                   '5.7.3 Educaci├│n T├®cnico Profesional y Equidad de G├®nero en Chile - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A41%3A14.384Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: '5.7.4 manual lenguaje no sexista en la administracion',
//             tools: [
//               {
//                 id: 208,
//                 type: 'g',
//                 original:
//                   '5.7.6 manual lenguaje no sexista en la administracion - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A41%3A40.834Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle:
//               '5.7.5 Strategies_for_Enhancing_Females_Participation_in_Nigeria',
//             tools: [
//               {
//                 id: 209,
//                 type: 'g',
//                 original:
//                   '5.7.8 Strategies_for_Enhancing_Females_Participation_in_Nigeria - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A10.593Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 6,
//     title: 'Incubation and entrepreneurship development centers',
//     stageNumber: 6,
//     sections: [
//       {
//         id: 1,
//         title: 'Incubation and entrepreneurship development centers',
//         description:
//           'One of the key objectives of vocational technical education is to prepare young people for entrepreneurship, to help them develop the relevant skills to face challenges of establishing and managing their own business. These entrepreneurial skills are particularly relevant in contexts that do not present many possibilities for salaried employment and it is important to recognize that salaried employment is not always attractive to all people and there are people who prefer to be their own boss and make their own plans. and dreams.',
//         image: stage6,
//         content: {
//           mainContent: `Another aspect that must be recognized is that in the socio-economic situation of most countries, salaried employment is no longer an option for life. Labor relations are increasingly temporary and flexible, which is why it is sometimes necessary to consider the options of salaried work and entrepreneurship as complementary options. It is possible, in different periods of working life to follow both options, there are people who combine a salaried job with their own company.

//                     At this stage there are 7 steps / actions that are recommended to be carried out in the design, development and implementation of your technical-vocational education initiatives for young people, women and men.`,
//           subContents: [
//             `A relatively recent trend in technical-vocational training institutes is the establishment of departments or centers for entrepreneurial development and the incubation of companies . Other institutions (and sometimes groups of young people themselves) have established spaces for co-creation in which different entrepreneurs work together and exchange their experiences.`,
//             `A supportive environment for students and recent graduates is very important, in which there is room to experiment and innovate, and in which there is still room to fail and restart, allowing young people to effectively take the step. important to enter the business area and conquer the market.`,
//             `A specific instrument frequently used is the holding of business plan development contests and the provision of special prizes for winners of these contests. Generating the opportunity for awards aimed especially at women with better business plans.`,
//             `In addition to the aforementioned, the entrepreneurial development centers must include an offer of support and specific accompaniment for women in order to ensure that they can enter the business area and the labor market well prepared and empowered.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '6.1.1 Erasmus for Young Entrepreneurs-Manual for Intermediary Organisations_EU_2017',
//             tools: [
//               {
//                 id: 210,
//                 type: 'none',
//                 original:
//                   '6.1.1.10 Erasmus for Young Entrepreneurs-Manual for Intermediary Organisations_EU_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A14.894Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 211,
//                 type: 'none',
//                 original: '6.1.1.6 entrepreneurial_learning_guide_en.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A20.630Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 212,
//                 type: 'none',
//                 original:
//                   '6.1.1.7-6.7.2.5 How to facilitate Social Business Incubation Youth_EU_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A25.785Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 213,
//                 type: 'none',
//                 original:
//                   '6.1.1.8 Role of Business Incubators on Youth Emploment Tanzania_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A32.308Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 214,
//                 type: 'none',
//                 original:
//                   '6.1.1.9 Role Business Incubators Youth Entrepreneurship Kenia_Academic_2016.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A38.962Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '6.1.2 Tu Plan de Negocios paso a paso',
//             tools: [
//               {
//                 id: 215,
//                 type: 'none',
//                 original: '6.1.2.5 Tu Plan de Negocios paso a paso.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A44.578Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: 'Business development',
//         description: '',
//         image: stage6,
//         content: {
//           mainContent: `In entrepreneurship training there are a variety of components that must be included. In this section you can find tools related to the basic steps to establish, develop and consolidate companies, such as:

//                     Business plan and (legal) requirements to register and establish a company
//                     Carrying out market research
//                     Marketing and sales
//                     Human resources management
//                     Financial management
//                     Measure customer satisfaction and respond to complaints
//                     Leadership (female)`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '6.2.1 50 tips para iniciar tu propio negocio',
//             tools: [
//               {
//                 id: 216,
//                 type: 'none',
//                 original: '6.2.1.2 50 tips para iniciar tu propio negocio.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A58.525Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 217,
//                 type: 'none',
//                 original:
//                   '6.2.1.3 Supporting-young-entrepreneurs-what-works.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A13.477Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 218,
//                 type: 'none',
//                 original:
//                   '6.2.1.4 Gender gap youth self-employment_Ethiopia_IDRC_2016.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A21.261Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 219,
//                 type: 'none',
//                 original: '6.2.1.5 Start your business manual_ILO_2015.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A28.228Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 220,
//                 type: 'none',
//                 original:
//                   '6.2.11 S4YE Digital Solutions for Youth Agripreneurship_WB_2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A39.902Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '6.2.2 S4YE Knowledge Brief 9 - E-commerce and Women-led SMEs in MENA_WB_2019',
//             tools: [
//               {
//                 id: 221,
//                 type: 'g',
//                 original:
//                   '6.2.7.10 S4YE Knowledge Brief 9 - E-commerce and Women-led SMEs in MENA_WB_2019 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A45.521Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 222,
//                 type: 'g',
//                 original:
//                   '6.2.7.8 Development of Female Entrepreneurship_promising practice_UNESCO_2020 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A53.691Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 223,
//                 type: 'none',
//                 original:
//                   '6.2.7.9 Gender barriers report Entrepreneurship and Leadership_UNICEF_2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A57.929Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Collective and corporate companies versus individual companies',
//         description: `One aspect of empowering people is teamwork and the use of complementary skills to establish and develop a business.`,
//         image: stage6,
//         content: {
//           mainContent: `One aspect of empowering people is teamwork and the use of complementary skills to establish and develop a business. In addition to this, the scale of the initiative and the volume of financial resources required to start the company, sometimes leads to the need to establish a collective or associative company. These companies can have different legal forms, the most common are the Association and Cooperative.

//                     The different models of collective and individual companies can be compared in order to make an informed decision regarding what type of company to establish in specific sectors and markets.`,
//           subContents: [
//             `Team or corporate work within a company can be a mechanism for empowerment and also for sharing business-related risks. These joint work mechanisms can also be a specific stimulus for women to enter the business world and conquer the market.

//                         `,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '6.3.1 C-BED_Orientation to Entrepreneurship Package_ILO',
//             tools: [
//               {
//                 id: 224,
//                 type: 'none',
//                 original:
//                   '6.3.1.10 C-BED_Orientation to Entrepreneurship Package_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A13.292Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 225,
//                 type: 'none',
//                 original:
//                   '6.3.1.11a C-BED_Aspiring Entrepreneurs_Learning_Module_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A18.615Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 226,
//                 type: 'none',
//                 original:
//                   '6.3.1.11b C-BED_AE_Learning_Module_-_Session_2.5_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A23.361Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 227,
//                 type: 'none',
//                 original:
//                   '6.3.1.12 C-BED_Innovation_for_Problem_Solving_and_Entrepreneurship_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A26.856Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 228,
//                 type: 'none',
//                 original: '6.3.1.13 C-BED_SBO_Learning_Module_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A32.382Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 229,
//                 type: 'none',
//                 original:
//                   '6.3.1.14 - 6.2.5.3 C-BED_Basic_Financial_Literacy_Learning_Module_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A37.254Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 230,
//                 type: 'none',
//                 original:
//                   '6.3.1.15 C-BED_Business_Plan_Development_Tool_ILO_2014.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A42.378Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 231,
//                 type: 'none',
//                 original:
//                   '6.3.1.16 C-BED_Learning_Module_for_Livelihoods_Resilience_and_Social_Protection_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A47.293Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '6.3.2 C-BED_AE_Learning_Module_Gender_Emphasis_ILO_2013',
//             tools: [
//               {
//                 id: 232,
//                 type: 'none',
//                 original:
//                   '6.3.2.7 C-BED_AE_Learning_Module_Gender_Emphasis_ILO_2013.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A52.146Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 233,
//                 type: 'none',
//                 original:
//                   '6.3.2.8 C-BED_SBO_Learners_Module_Gender_Emphasis_ILO_2013.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A56.920Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: 'Development and management of supply and value chains',
//         description: '',
//         image: stage6,
//         content: {
//           mainContent: `In socio-economic and business development the concepts of the value chain and supply chain are increasingly used and there are a variety of models and methodologies to analyze these chains. The basic assumption of these concepts is that companies do not operate in a vacuum but are always strongly linked and articulated as a chain. In order to develop a business plan for an individual company, it is essential to know the chain in which it operates and to understand the positioning of the company in the chain.`,
//           subContents: [
//             `Once this positioning is known, its role and position in the value chain can be consolidated and strengthened. It is also important to identify specific possibilities to strengthen the position of women in the management and development of value or supply chains.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '6.4.1 Do agricultural development projects reach, benefit or empower women',
//             tools: [
//               {
//                 id: 234,
//                 type: 'g',
//                 original:
//                   '6.4.1.2 Do agricultural development projects reach, benefit or empower women - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A02.283Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 235,
//                 type: 'g',
//                 original:
//                   '6.4.1.4 Toolbox Promoting equal participation in sustainable economic development - GIZ - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A09.005Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '6.4.2 Extracting Equality - Gender equality in extractive industries guidelines',
//             tools: [
//               {
//                 id: 236,
//                 type: 'gp',
//                 original:
//                   '6.4.2.1 Extracting Equality - Gender equality in extractive industries guidelines - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A16.379Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 237,
//                 type: 'gp',
//                 original:
//                   '6.4.2.2 The power of procurement - How to source from women-owned businesses - UN Women - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A20.784Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 238,
//                 type: 'gp',
//                 original:
//                   '6.4.2.3 Women in Agribusiness Report - IFC - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A24.983Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 5,
//         title: `Selection, preparation and training of tutors (mentors) and counselors (coaches)`,
//         description: ``,
//         image: stage6,
//         content: {
//           mainContent: `An important element of the educational process, both during the time spent in class and the time spent in exposure and practice of the labor and business world, is the accompaniment of students through orientation ( coaching ) and mentoring . Guidance and tutoring are not limited to school time and can extend to the time prior to entering the TVET institution and / or post-school time at work and as a young entrepreneur. We refer to training and coaching below the life skills stage (See section 4.5).

//                     `,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '4.5.1 Digital-Skills-Toolkit',
//             tools: [
//               {
//                 id: 167,
//                 type: 'none',
//                 original: 'Digital-Skills-Toolkit.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A01.848Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '4.5.2  Programa de Mentoria',
//             tools: [
//               {
//                 id: 168,
//                 type: 'none',
//                 original: '4.5.2.1 Programa de Mentoria.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A16.393Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 169,
//                 type: 'none',
//                 original:
//                   '4.5.2.5 Guia Orientacion Socio-ocupacional_docentes_Bogota_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A20.425Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 170,
//                 type: 'none',
//                 original:
//                   '4.5.2.6 Secuencia Didactica Orientacion Socio-ocupacional_docentes_Min Edu Col_Dic 2015.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A26.638Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '4.5.3 Engaging employers in Apprenticeships opportunities - OECD',
//             tools: [
//               {
//                 id: 171,
//                 type: 'p',
//                 original:
//                   '4.5.3.1 Engaging employers in Apprenticeships opportunities - OECD - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A32.988Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 172,
//                 type: 'p',
//                 original:
//                   '4.5.3.2 Toolbox for Apprenticeship Coaches- Increase Apprenticeships in SMEs - AC4SME - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A38.520Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: '4.5.4 Enfoque de genero TUI Academy - G & P',
//             tools: [
//               {
//                 id: 173,
//                 type: 'gp',
//                 original: '4.5.4.1 Enfoque de genero TUI Academy - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A44.692Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 174,
//                 type: 'g',
//                 original:
//                   '4.5.4.2 Handbook for Youth Workers-Gender-LGBTIQ-2016-EU - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A48.398Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle:
//               '4.5.5 Handbook of ICT practices for guidance and career development',
//             tools: [
//               {
//                 id: 175,
//                 type: 'none',
//                 original:
//                   '4.5.5.1 Handbook of ICT practices for guidance and career development.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A53.067Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 176,
//                 type: 'p',
//                 original:
//                   '4.5.5.3 Skills needs anticipation assessments and approaches - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A03.824Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 177,
//                 type: 'g',
//                 original:
//                   '4.5.5.4--5.6.2.3 Empowering rural women through ICT in TVET_UNESCO_2017 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A09.662Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 6,
//         title: 'Financial management',
//         description: `A key aspect for successful entrepreneurship and business development is access to capital and good financial management.`,
//         image: stage6,
//         content: {
//           mainContent: `A first step in Financial Management is to identify the possibilities and mechanisms to obtain access to seed capital and credit to start a company ( start-ups) , specifically relevant for young people starting their first entrepreneurial experience. Subsequently there is also a need for credit to grow the business and to finance recurring costs (such as to hold stocks or buy agricultural inputs). This requires the ability to prepare loan applications in banks and microfinance institutions , and after obtaining them to keep a good record of income and expenses to ensure that the credit will be repaid on time, to avoid an accumulation of the costs of the loan. financing.

//                     `,
//           subContents: [
//             `Many theories and publications have identified that women are generally more efficient and reliable in managing investments and the necessary financing for investment, and in paying their debts. This may be a reason to focus on training and preparing women in the financial aspects of business management, as the effect on the sustainability and profitability of businesses can be very strong. At the same time, one must not forget to train men in financial matters to enable them to become as good at management as women. And of course the training of women must also prepare them for top management positions in the business world.`,
//             `When making investments in the company it is important to understand the concepts of investment and depreciation and to be able to apply depreciation in financial management to ensure the renewal / maintenance of investments at the appropriate times.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '6.6.1 Challenge-Fund-for-Youth-Employment-Uganda-Scoping-Report_2019',
//             tools: [
//               {
//                 id: 239,
//                 type: 'none',
//                 original:
//                   '6.6 Challenge-Fund-for-Youth-Employment-Uganda-Scoping-Report_2019.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A54.077Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 240,
//                 type: 'none',
//                 original:
//                   '6.6 Financial_management_practices_in_successful_Small.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A00.828Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 241,
//                 type: 'none',
//                 original: '6.6 Funding women entrepreneurs_EIB_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A04.926Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 242,
//                 type: 'none',
//                 original:
//                   '6.6 LaGestionFInancieraylacompetitividadPYME_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A18.648Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 243,
//                 type: 'none',
//                 original: '6.6 Manual Gestion financiera para PYMES.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A24.793Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '6.6.2 Invest in Women - IFC',
//             tools: [
//               {
//                 id: 244,
//                 type: 'g',
//                 original: '6.6.1.1 Invest in Women - IFC - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A33.396Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '6.6.3 Determinants for financial inclusion of youth entrepreneurs_PEP_2020',
//             tools: [
//               {
//                 id: 245,
//                 type: 'none',
//                 original:
//                   '6.6.2.3 Determinants for financial inclusion of youth entrepreneurs_PEP_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A41.384Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 7,
//         title: 'Corporate Social Responsibility (CSR) and Social Enterprises',
//         description: '',
//         image: stage6,
//         content: {
//           mainContent: `A relatively recent and very important trend in socio-economic development worldwide is Corporate Social Responsibility(RSE or CSR in English). This trend is related to a growing concern of civil society, the business world and governments to respect human rights at work and take better care of the environment to combat climate change. More and more companies are introducing CSR policies and practices and it is important to know and understand these trends when entering the private sector as an entrepreneur (respecting rights) and also as a worker (knowing their rights), especially as women whose rights are less respected. At the same time, it is necessary to improve the understanding of although CSR may involve an additional cost for the company, it has been shown that in the long term it represents clear economic and corporate benefits, better profitability and sustainability for companies.`,
//           subContents: [
//             `The concept of social enterprise , particularly in Latin America, has grown considerably in importance. In many cases, it is young people who establish different types of social enterprises and sometimes also forms of cooperation between these social enterprises in spaces of joint work or even co-creation. In this way, it is possible to realize advantages of scale of operations, strengthen innovation and exchange of technologies or cooperate in initiatives and joint campaigns for awareness, advocacy and lobbying.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '6.7.1 Impact CSR on Female Education Development in Rural NIgeria_2020',
//             tools: [
//               {
//                 id: 246,
//                 type: 'none',
//                 original:
//                   '6.7.1.3 Impact CSR on Female Education Development in Rural NIgeria_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A46.915Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '6.7.2 Social-Entrepreneurship-and-youth employment-S4YE-WB_2018',
//             tools: [
//               {
//                 id: 247,
//                 type: 'none',
//                 original:
//                   '6.7.2.6 Social-Entrepreneurship-and-youth employment-S4YE-WB_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A52.382Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 248,
//                 type: 'none',
//                 original:
//                   '6.7.2.7 S4YE Knowledge Brief #5 Social Enterprise and Youth Employment_WB_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A56.747Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 8,
//         title: 'Examples and good practices',
//         description:
//           'In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.',
//         image: stage6,
//         content: {
//           mainContent: `The documents are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.

//                     `,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '6.8.1 Business Case El Salvador - Plan & Accenture',
//             tools: [
//               {
//                 id: 249,
//                 type: 'none',
//                 original:
//                   '6.8.1.2 Business Case El Salvador - Plan & Accenture.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A01.870Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 250,
//                 type: 'g',
//                 original:
//                   '6.8.1.3 Afrifresh Fresh produce gender mainstreaming in South Africa - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A07.398Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 251,
//                 type: 'gp',
//                 original:
//                   '6.8.1.3 Driving Toward Equality - Women ride-hailing and the sharing economy - IFC & Accenture - G & P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A26.857Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 7,
//     title: 'Sustainability among youth',
//     stageNumber: 7,
//     sections: [
//       {
//         id: 1,
//         title: `Sustainability among youth`,
//         description: `A first level of sustainability that should be considered is the sustainability of the effects and results of projects and initiatives to prepare young people for their employment or to follow the path of entrepreneurship.`,
//         content: {
//           mainContent: `The responsibility of the entity implementing the YEE project does not end with the entry of young people into the world of work or entrepreneurship. It is important to continue accompanying them in paid work and as young entrepreneurs for a considerable period in order to:

//                     Continue to offer support services to post-graduates in their world of work, for example by continuing mentoring ( see stage 4: life skills );
//                     Learn from work experiences to improve FTP curricula and improve the quality of learning techniques, models and methods for internship, etc.
//                     Measure the impact of YEE projects in the medium and long term on the beneficiary groups and other stakeholders ( see stage 8: sustainability of the YEE project and stage 9: M&E ).`,
//           subContents: [``],
//         },
//         image: stage7,
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '7.1.1 Tracking vocational graduates in EU candidate countries',
//             tools: [
//               {
//                 id: 252,
//                 type: 'none',
//                 original:
//                   '7.1.1. Tracking vocational graduates in EU candidate countries.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A42.936Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '7.1.2 Integrating core work skills into TVET systems- Six country case studies - ILO',
//             tools: [
//               {
//                 id: 253,
//                 type: 'none',
//                 original:
//                   '7.1.2 Integrating core work skills into TVET systems- Six country case studies - ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A46.309Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: 'Alumni networks and clubs',
//         description: `An efficient and frequently used way to maintain contact with postgraduates is the establishment and maintenance of networks and alumni clubs.`,
//         image: stage7,
//         content: {
//           mainContent: `Through social networks and spaces, regular contact with former students can be maintained efficiently. In activities such as experience-sharing conferences, meetings, etc., strong mechanisms can be created for graduates to continue learning continuously, and to continue exchanging learning with fellow students still in the graduation process.

//                     These continuous learning mechanisms can also include mentoring and peer review mechanisms (see also section 4.5) between postgraduates or between postgraduates and students, or also between postgraduates and teachers. These exchanges can also include meetings and activities with the participation of postgraduates and current students. Post-graduates can be a very useful instrument to identify possibilities for internships and professional apprenticeships and job opportunities. Post-graduates can also be an instrument to identify new people and / or groups that can benefit from a YEE project. In networking alumni, it is important to consider training opportunities for specific groups, for example women, people with disabilities or people from the LGBT community.`,
//           subContents: [
//             `Networks can also be organized by industry (transport, agriculture, maquila, etc.) or by sector (own companies, salaried persons in the private or public sector) to increase the relevance of the exchange. Alumni networks / clubs also facilitate contact in the medium and long term to continue the accompaniment and monitoring of the effects and impact of the YEE project, even after very long periods (10 years or more). An important aspect to consider in the establishment of these alumni networks is to define a continuity mechanism for the management and maintenance of the networks.`,
//             `While YEE organizations and FTP instances can offer spaces and physical instruments for carrying out activities, management and coordination should be the responsibility of the alumni, preferably based on volunteerism.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '7.2.1 International Youth Foundation 2025-Strategy-Brochure_2020',
//             tools: [
//               {
//                 id: 254,
//                 type: 'none',
//                 original:
//                   '7.2.1a International Youth Foundation 2025-Strategy-Brochure_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A53.301Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 255,
//                 type: 'none',
//                 original:
//                   '7.2.1b International Youth Foundation_Transformation-2022_IYF-Strategy-SP.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A05.162Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 256,
//                 type: 'none',
//                 original:
//                   '7.2.1c International Youth Foundation_Transformation-2022_IYF-Strategy-PO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A19.291Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 257,
//                 type: 'none',
//                 original:
//                   '7.2.1d International Youth Foundation_Transformation-2022_IYF-Strategy-FR.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A32.068Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '7.2.2 How to Plan Successful Alumni Events for Greater Engagement',
//             tools: [
//               {
//                 id: 258,
//                 type: 'none',
//                 original:
//                   '7.2.3 How to Plan Successful Alumni Events for Greater Engagement.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A48.266Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Role models',
//         description: '',
//         image: stage7,
//         content: {
//           mainContent: `Already graduates, with their new experiences gained in the world of work, can serve as role models for people who are still in the educational journey. The use of role models (7.3.) Can be a very strong educational tool for young people. The use of role models is also an important tool to break gender stereotypes at work. Women heads or company directors, or women in non-traditional jobs, successful women entrepreneurs, can show that they have achieved success in their careers and this can inspire their peers who are still studying to follow those examples with more self-confidence.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '7.3.1 Social-capital-of-lses-students-using-student-stories-to-mobilise-student-success_2019',
//             tools: [
//               {
//                 id: 259,
//                 type: 'none',
//                 original:
//                   '7.3.2 Social-capital-of-lses-students-using-student-stories-to-mobilise-student-success_2019.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A51.893Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: `Expansion of networks and alliances`,
//         description: '',
//         image: stage7,
//         content: {
//           mainContent: `The expansion of networks and partnerships with new companies and public, private and civil organizations  in the field of FTP institutes is very important to be able to offer more opportunities for people already graduated and also to increase the variety of inputs and ideas of the market in the continuous improvement of curricula and learning methodologies. Postgraduates can serve as a vehicle for expanding contacts and relationships with new companies and organizations.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '7.4.1 S4YE Private Sector Webinar - Facebook & AEO presentation_WB_2020',
//             tools: [
//               {
//                 id: 260,
//                 type: 'g',
//                 original:
//                   '7.4.5 S4YE Private Sector Webinar - Facebook & AEO presentation_WB_2020 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A55.345Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 5,
//         title: 'Examples and good practices',
//         description:
//           'In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.',
//         image: stage7,
//         content: {
//           mainContent: `The documents are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.

//                     `,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '7.5.1 International Youth Foundation_COVID-Strategy-Update_2020',
//             tools: [
//               {
//                 id: 261,
//                 type: 'none',
//                 original:
//                   '7.5 International Youth Foundation_COVID-Strategy-Update_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A11.783Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 8,
//     title: 'YEE project Sustainability',
//     stageNumber: 8,
//     sections: [
//       {
//         id: 1,
//         title: `Articulation with state policies`,
//         description: `A pre-condition for the sustainability of its Youth Economic Empowerment (YEE) project is the articulation with state policies in the provision of technical-vocational education and the maintenance of coordination and cooperation relationships with state entities. This link is a condition for the legality of the initiative and the formal recognition of curricula and certifications of education or professional technical training offered to groups of young people.

//                 `,
//         content: {
//           mainContent: `A pre-condition for the sustainability of its Youth Economic Empowerment (YEE) project is the articulation with state policies in the provision of technical-vocational education and the maintenance of coordination and cooperation relationships with state entities. This link is a condition for the legality of the initiative and the formal recognition of curricula and certifications of education or professional technical training offered to groups of young people.
//                     `,
//           subContents: [],
//         },
//         image: stage8,
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '8.1.1 Educacion tecnico profesional en la politica publica-2014',
//             tools: [
//               {
//                 id: 262,
//                 type: 'none',
//                 original:
//                   '8.1.1. Educacion tecnico profesional en la politica publica-2014.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A14.657Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '8.1.2 The role of TVET governance at sub-national levels',
//             tools: [
//               {
//                 id: 263,
//                 type: 'none',
//                 original:
//                   '8.1.2 The role of TVET governance at sub-national levels.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A19.646Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle: '8.1.3 Gender in Entrepreneurship-EIGE-2016',
//             tools: [
//               {
//                 id: 264,
//                 type: 'none',
//                 original: '8.1.3 Gender in Entrepreneurship-EIGE-2016.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A24.020Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle: '8.1.4 National Strategic Framework Lebanon TVET_2018',
//             tools: [
//               {
//                 id: 265,
//                 type: 'none',
//                 original:
//                   '8.1.6 National Strategic Framework Lebanon TVET_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A31.087Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle:
//               '8.1.5 Gender Inequality in the World of Work_ESTT_2019',
//             tools: [
//               {
//                 id: 266,
//                 type: 'g',
//                 original:
//                   '8.1.7 Gender Inequality in the World of Work_ESTT_2019 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A39.953Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 6,
//             shortTitle: '8.1.6 Plan of action youth employment ILO_2020',
//             tools: [
//               {
//                 id: 267,
//                 type: 'none',
//                 original: '8.1.8 Plan of action youth employment ILO_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A53.108Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 7,
//             shortTitle: '8.1.7 Productive Employment Synthesis - RIDSSA 2018',
//             tools: [
//               {
//                 id: 268,
//                 type: 'none',
//                 original:
//                   '8.1.9 Productive Employment Synthesis - RIDSSA 2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A05.393Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: `Proposal development`,
//         description: ``,
//         content: {
//           mainContent: `For the YEE initiative conception phase and the preparation of follow-up and replication projects and initiatives, it is important to have and improve the capacity to generate and develop good quality and viable project proposals . There is a wide variety of inputs and tools for the development of projects in the area of ​​education and Professional Technical Training (FTP). A specific aspect of proposal development is the inclusion of a strategy and actions to ensure that your Youth Economic Empowerment (YEE) project is a transformer of gender relations in education and at work.`,
//           subContents: [],
//         },
//         image: stage8,
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '8.2.1 ChallengesandOpportunitiesofTVETinDevelopingCountriesACaseofSudan 2019',
//             tools: [
//               {
//                 id: 269,
//                 type: 'none',
//                 original:
//                   '8.2.5 ChallengesandOpportunitiesofTVETinDevelopingCountriesACaseofSudan 2019.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A10.417Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '8.2.2 TVET influence on World Economy',
//             tools: [
//               {
//                 id: 270,
//                 type: 'none',
//                 original: '8.2.6 TVET influence on World Economy.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A14.203Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle: '8.2.3 TVET labour inclusion and equality 2019 UNESCO',
//             tools: [
//               {
//                 id: 271,
//                 type: 'none',
//                 original:
//                   '8.2.7 TVET labour inclusion and equality 2019 UNESCO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A19.541Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Mapping of funding sources',
//         description: ``,
//         image: stage8,
//         content: {
//           mainContent: `The ability to generate good project proposals also requires the ability to analyze financing possibilities, in addition to identifying and mapping possible sources of financing for Youth Economic Entrepreneurship (YEE) projects.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '8.3.1 Orientacio╠ün metodolo╠ügica de mapeo de donantes para un organismo internacional en Centro America',
//             tools: [
//               {
//                 id: 272,
//                 type: 'none',
//                 original:
//                   '8.3.1 Orientacio╠ün metodolo╠ügica de mapeo de donantes para un organismo internacional en Centro America.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A26.287Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '8.3.2 How-does-aid-support-womens-economic-empowerment-OECD-2021',
//             tools: [
//               {
//                 id: 273,
//                 type: 'none',
//                 original:
//                   '8.3.3 - 6.6 How-does-aid-support-womens-economic-empowerment-OECD-2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A30.179Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle: '8.3.3 Gender Smart Financing_Europe_EU_2020',
//             tools: [
//               {
//                 id: 274,
//                 type: 'none',
//                 original:
//                   '8.3.4 - 6.6 Gender Smart Financing_Europe_EU_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A35.096Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: 'Marketing and communication with a gender perspective',
//         description: ``,
//         image: stage8,
//         content: {
//           mainContent: `The communication and marketing projects and initiatives Youth Economic Empowerment (YEE)  at the level of the target groups (prospective students), and at the level of companies. In communication and marketing, special attention should be paid to communicating how the initiative / project can specifically serve female youth and how the provision of education and services can break gender stereotypes and contribute to the transformation of gender relations. gender in the world of work. This requires not only a focus on unemployed women, but on women in general, since there are several who are not even looking for work (and therefore do not enter the unemployment data) due to the obstacles they face (such as, for example, the I take care of their children).`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '8.4.1 Gender responsive communication in development',
//             tools: [
//               {
//                 id: 275,
//                 type: 'g',
//                 original:
//                   '8.4.1 Gender responsive communication in development - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A43.600Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '8.4.2 Gender Responsive National Communications Toolkit - UNDP',
//             tools: [
//               {
//                 id: 276,
//                 type: 'g',
//                 original:
//                   '8.4.2 Gender Responsive National Communications Toolkit - UNDP - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A49.435Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 5,
//         title: `Lobbying and Evidence-Based Advocacy`,
//         description: ``,
//         image: stage8,
//         content: {
//           mainContent: `One aspect of project sustainability is the inclusion and replication of models and methodologies in government policies and private sector initiatives. This requires a systematic work on the transfer of knowledge to other educational entities and relevant instances in the world of work, both in the private and public sectors. This requires establishing evidence-based advocacy and lobbying strategies and practices.generated by the project or other good practices. To this end, the project must include the development of skills in the area of ​​lobbying and advocacy. It is also recommended that each YEE project include a lobbying component (and resources) to ensure the sustainability of youth empowerment and work with government policies and with the private sector.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle: '8.5.1 Evidence based advocacy for gender in Education',
//             tools: [
//               {
//                 id: 277,
//                 type: 'g',
//                 original:
//                   '8.5.3 Evidence based advocacy for gender in Education - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A55.988Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '8.5.2 gd-oxfam-guide-feminist-influencing-en',
//             tools: [
//               {
//                 id: 278,
//                 type: 'none',
//                 original: '8.5.6 gd-oxfam-guide-feminist-influencing-en.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A51%3A02.644Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 279,
//                 type: 'none',
//                 original: '8.5.6 gd-oxfam-guide-feminist-influencing-es.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A51%3A08.921Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '8.5.3 The education_we_want_youth_advocacy_toolkit_Plan-UNESCO_2015',
//             tools: [
//               {
//                 id: 280,
//                 type: 'none',
//                 original:
//                   '8.5.8 The education_we_want_youth_advocacy_toolkit_Plan-UNESCO_2015.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A51%3A15.081Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 6,
//         title: `Establishment of alliances and networks of contacts`,
//         description: `An important strategy to improve prospects for sustainability is the establishment of strategic alliances.`,
//         image: stage8,
//         content: {
//           mainContent: `The construction of these alliances should begin from the beginning of the YEE project, to ensure that they are sufficiently strong at the time of project completion and to ensure the continuity of the process initiated during implementation. Strategic alliances must be established with both private and governmental institutions present in the areas of implementation, through Public-Private Alliances.`,
//           subContents: [
//             `Already in stage 1, we have demonstrated the importance of identifying the possibilities to establish strategic alliances. In the final stage of your YEE projects, these alliances must be ensured to guarantee the continuity and replication of your project and the insertion of lessons learned in proposals for the development of new policies and projects to promote the entry of male and female youth in the job market and in individual or social enterprises.

//                         `,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '8.6.1 Partnerships and networks in work with young people_OpenUniversity_2016',
//             tools: [
//               {
//                 id: 281,
//                 type: 'none',
//                 original:
//                   '8.6.10 Partnerships and networks in work with young people_OpenUniversity_2016.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A51%3A59.614Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '8.6.2 UNESCO-UNEVOC catalyses Networking and Partnership in TVET in the post-2015 agenda',
//             tools: [
//               {
//                 id: 282,
//                 type: 'none',
//                 original:
//                   '8.6.2 UNESCO-UNEVOC catalyses Networking and Partnership in TVET in the post-2015 agenda.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A08.028Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '8.6.3 LA ENSEN╠âANZA Y FORMACIO╠üN TE╠üCNICO PROFESIONAL EN AME╠üRICA LATINA Y EL CARIBE una perspectiva regional',
//             tools: [
//               {
//                 id: 283,
//                 type: 'none',
//                 original:
//                   '8.6.3 LA ENSEN╠âANZA Y FORMACIO╠üN TE╠üCNICO PROFESIONAL EN AME╠üRICA LATINA Y EL CARIBE una perspectiva regional.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A17.407Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle:
//               '8.6.4 PES Network - Conference synthesis paper - The power of PES_2021 partnerships',
//             tools: [
//               {
//                 id: 284,
//                 type: 'none',
//                 original:
//                   '8.6.4 PES Network - Conference synthesis paper - The power of PES_2021 partnerships.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A23.930Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle: '8.6.5 Engaging the private sector_ILO_2017',
//             tools: [
//               {
//                 id: 285,
//                 type: 'none',
//                 original: '8.6.5 Engaging the private sector_ILO_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A28.665Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 6,
//             shortTitle:
//               '8.6.6 The Private Sector and Youth Skills and Employment Programs_WB_2015',
//             tools: [
//               {
//                 id: 286,
//                 type: 'none',
//                 original:
//                   '8.6.6 The Private Sector and Youth Skills and Employment Programs_WB_2015.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A33.530Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 7,
//             shortTitle:
//               '8.6.7 S4YE Brief on Private Sector Inititiatives during COVID Final_WB_2021',
//             tools: [
//               {
//                 id: 287,
//                 type: 'none',
//                 original:
//                   '8.6.7 S4YE Brief on Private Sector Inititiatives during COVID Final_WB_2021.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A41.371Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 8,
//             shortTitle:
//               '8.6.8 Knowledge Brief - Linkages and Youth Employment_IFC_2017',
//             tools: [
//               {
//                 id: 288,
//                 type: 'none',
//                 original:
//                   '8.6.8 Knowledge Brief - Linkages and Youth Employment_IFC_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A46.289Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 9,
//             shortTitle:
//               '8.6.9 Knowledge Brief - Promoting Coordination to Advance Employment Services for Youth_GIZ_2017',
//             tools: [
//               {
//                 id: 289,
//                 type: 'none',
//                 original:
//                   '8.6.9 Knowledge Brief - Promoting Coordination to Advance Employment Services for Youth_GIZ_2017.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A51.921Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 7,
//         title: `Examples and good practices`,
//         description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.`,
//         image: stage8,
//         content: {
//           mainContent: `The documents are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.

//                     `,
//           subContents: [],
//         },
//         tools: [],
//       },
//     ],
//   },
//   {
//     id: 9,
//     title: `Monitoring, evaluation and learnings`,
//     stageNumber: 9,
//     sections: [
//       {
//         id: 1,
//         title: `Monitoring, evaluation and learnings`,
//         description: `Different data collection methods are used in M&E processes, making use of one or more tools. Quantitative methods such as surveys help to generate statistical evidence, while qualitative methods such as interviews, focus groups, mapping, etc. They help gather deeper and more nuanced information about individual and collective struggles, experiences, and interpretations of the change process.`,
//         image: stage9,
//         content: {
//           mainContent: `The M&E system of a YEE project consists of a set of indicators that are periodically monitored, through surveys with young project participants and interviews with training institutions and partner companies. Below are some tools to carry out various activities at this stage:`,
//           subContents: [
//             `A: Characterization and registration form at the time of registration of the young person: It collects in a standardized way the basic information of each participant through a survey at the time of registration that serves as a baseline for the monitoring and evaluation system of the YEE project. The instrument can also be used to make the selection of the target group of the project according to the instructions in the sheet “Condition evaluation criteria” (see also section 3.2.1).`,
//             `B: Young person monitoring survey aims to collect, in an organized and standardized way, information from each young participant through surveys that allow evaluating indicators that measure the good performance of the YEE project. The instrument presents six surveys in total: three for young people from the employability component and three for young people from the entrepreneurship component to be applied at the beginning of the training stage, six months and 12 months after completing the training.`,
//             `C: Monitoring survey to training institution and partner companies aims to collect, in an organized and standardized way, information on project performance indicators through a survey of partner entities (educational institutions, companies and / or public entities that provide employment or internships for young people) to improve the intervention and results of the project. It is recommended to include questions differentiated by gender to be able to capture differences in the performance of women and men in order to adjust the intervention strategy of the project from a gender equity perspective.`,
//             `D: Satisfaction interview with young people and allied entities , which aims to explore the satisfaction and perceptions of the different actors participating in the YEE project, through an individual or group interview. The interview is a complement to the monitoring survey of young people and partner entities (instrument B and C) and is intended to generate a more qualitative analysis of the project's intervention to provide feedback and improve it. The interview guide is accompanied by an informed consent form that is read and signed by the person interviewed.`,
//             `E: Youth characterization and monitoring matrix. The information is systematized and feeds the main indicators of the YEE LATAM monitoring system. For the purposes of your YEE project indicators, review the indicators used by your organization and those defined in the baseline study to facilitate project monitoring and evaluation.`,
//             `When designing indicators, it should be clear how the information that measures the achievement of the indicator can be collected. This can be done through quantitative methods, such as surveys, or qualitative methods, such as interviews and focus groups. To ensure that the indicators are objectively verifiable they have to be SMART (specific, measurable, achievable, relevant and realistic over time). Checklists can be used for the definition of objectively verifiable indicators included in this toolbox.

//                         Some recommendations for the M&E process are:

//                         Clearly define the output, outcome, and impact indicators according to the project's logical framework or theory of change.
//                         Indicate the disaggregations for each indicator (minimum by sex, but it can also be by age, community, etc.), source of indicator information, institution responsible for providing indicator data, recommended measurement frequency, and observations on data quality.
//                         Disaggregate all the information by sex in order to allow an analysis from a gender perspective.
//                         Develop a user-friendly information management system that allows standardizing and optimizing the procedures for measuring, storing and managing the information of the different project indicators.
//                         Hire a specialist person to follow up on the monitoring and evaluation system.
//                         As an aspect of vital importance to guarantee the success of the relationship with vocational training entities, a strategy of delivery and permanent control of the information must be generated, which allows monitoring the scope of the products and handling of the relevant information of young people. participants.
//                         In the monitoring surveys of project partner entities, training institutions and companies that provide employment, ask questions differentiated by sex in order to capture differences in the performance of women and men in order to adjust the project intervention strategy from a perspective of genre.
//                         Plan has developed YES! Me, which is a digital monitoring system for the registration and follow-up of the participants of a YEE project. The system can monitor young people for up to 6 years after their participation in the project. Similarly, the system collects information to measure the impact of the project at the individual level as well as by groups.

//                         `,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '9.1.1 Guide on Measuring Decent Jobs for Youth_M&E_ILO',
//             tools: [
//               {
//                 id: 290,
//                 type: 'none',
//                 original:
//                   '9.1.7.3 Guide on Measuring Decent Jobs for Youth_M&E_ILO.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A56.836Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: `M&E with a Gender Approach`,
//         description: `What, why and how M&E with a gender perspective`,
//         image: stage9,
//         content: {
//           mainContent: `Monitoring and evaluation with a gender perspective aims to evaluate the effects and impacts of the YEE project (intentional or not) on gender relations and the empowerment of women. Changes in (1) the conditions and positions of women and men (individually and comparatively), who participate in vocational training, employment or an enterprise within a value chain, including income, should be monitored; (2) gender relations, such as the division of labor according to gender, access to and control over resources and information, decision-making, among others, and (3) the attitudes and perceptions of women and men. Gender-sensitive M&E should not only collect gender data, `,
//           subContents: [
//             `Gender should be addressed in ongoing monitoring and during evaluations for the same reasons that we address other issues: when assessing whether an activity is achieving its objectives, we can consider what has been achieved and what can be learned and feedback in additional efforts. If results are not evaluated against gender strategies and interventions, they are unlikely to receive attention during project implementation.`,
//             `Gender-sensitive M&E in a results-based framework reveals the extent to which the project has achieved improvements in the social and economic well-being of women and men. It also helps improve project performance during implementation, facilitates mid-term adjustments, and helps draw lessons for future projects, for example by detecting and addressing gender-based constraints.`,
//             `Individual empowerment interventions without considering the people in their environment (at work, but also in their home or community) and the gender relations between them, can fail. Gender M&E can identify unintended consequences and opportunities for real empowerment of young people, especially women. By demonstrating the impacts of interventions for both women and men, these data can be used to improve decision-making, strategies, and interventions in such a way that gender imbalances are overcome and equitable development occurs, benefiting young people. genders, age groups and ethnicities.

//                         Design an M&E system with a gender perspective

//                         Gender should be included from the beginning of the project and in the design of the monitoring plan or system. If a monitoring framework already exists (such as a logical framework or theory of change), the gender approach should be integrated. This involves reviewing all indicators, targets, results, data collection methods, etc. for their gender responsiveness and adding gender-sensitive indicators, results, and methods if necessary. Ideally, this is done in an integrated way, from the start of a project. If gender has not been taken into account at the project design stage, it will most likely not be taken into account during implementation either. Integrating a gender approach can be done with any monitoring framework, including Theory of Change or Pathways of Impact.`,
//             `The goals, purposes or objectives of the project should explicitly refer to gender or reflect the needs and priorities of women as well as those of men. The monitoring and evaluation strategy for the interventions should specify the expected gender outcomes. These can be formulated at various levels: at the individual, household, market, business, community, and even political and macro levels. The gender analysis and the baseline with a gender approach during the project design stage (stage 2) should provide relevant information for the development of the gender-sensitive M&E system.`,
//             `During implementation, gender analysis (see stage 1 for reference documents) is used to monitor the results of interventions on men and women, gender relations and the position of women. It is recommended to measure benefits and adverse effects on men and women separately whenever possible, and check if the needs and interests of women and men are still being taken into consideration during implementation.`,
//             `M&E should reflect gender complexities and changes taking place at different levels: policies, laws, resource allocation, social structures, culture, beliefs and practices. It is necessary to include the context in which the status of women is improved and the temporal dynamics, for example, if gender gaps have been reduced and to what extent empowerment processes have taken place over time. It is crucial to focus on different types of impacts, including economic, social, cultural, political, and psychological impacts.`,
//             `M&E must be participatory and involve women and men, as well as the different actors involved in the project. The combination of qualitative and quantitative data collection tools is useful for capturing different dimensions of the impacts achieved.`,
//             `The report should address gender-related findings, both the results of gender mainstreaming in the overall project context, the results of the project's interventions on men, women, and gender relations, as well as the lessons learned from implementation. . Gender impacts should not be included in a separate section, but should be integrated into each section of the report.`,
//             `Institutional structures and guidelines are needed to support good gender oversight at the national, local and program levels. Insist that project staff and other stakeholders make specific and adequately detailed references to gender in supervision forms, progress reports, and other project documents. Document any gender differences, even when not mentioned in the project logframe. Make sure staff have the skills or obtain the necessary training and tools to understand gender and the importance of monitoring. Gender experts must be included for M&E.`,
//             `Development of indicators and targets with a gender perspective

//                         Gender-sensitive indicators must be developed at all levels, not only at the level of outputs and results, but also, and most of all, at the level of impact. That is, it does not have to focus only on the measurement of numbers and products, such as an increase in the participation of women in training and employment, but rather pay attention to the intensity, quality and remuneration of their participation, especially to the real benefits in terms of social and economic empowerment, and in reducing gender-based inequalities.

//                         To be gender sensitive, indicators must:

//                         Require the collection of information disaggregated by sex whenever possible about who participates and benefits;
//                         Assess whether the project has different benefits and impacts for men and women, and help us analyze why these differences occur between women and men;
//                         Evaluate if the project is producing a change in gender relations, and help us analyze how gender relations are changing (positively or negatively) and how this impacts on the achievement of the general objectives of the project; and
//                         Involve women and men in the development of the indicators and in the collection and analysis of information.
//                         `,
//             `It is recommended to use indicators that measure movement in positions (instead of counting numbers) and to measure changes in the levels of gender inequality, measuring, for example, the “change in the proportion of women in management positions” instead of the "Number of women hired for management positions."

//                         Collection and use of sex-disaggregated data

//                         In order to conduct gender-sensitive monitoring and evaluation, sex-disaggregated data is required and must be collected continuously. During the market analysis, gender analysis and baseline (see stages 1 and 2), the data collection should already be disaggregated by sex. When analyzing the collected data, the results and perceptions must be differentiated for women and men, and the project must aim to understand the differences, explain them and formulate responses.`,
//             `Sex (or gender) disaggregated data is data related to individuals that is collected, analyzed and presented separately for men and women. It is also recommended to disaggregate by age and, in some cases, by other variables, such as ethnic origin, marital status, sexual identity, etc. Collecting data disaggregated by sex and other variables can greatly inform YEE project initiatives, improve implementation (working with the most appropriate beneficiaries), and lead to a more effective monitoring and evaluation process (e.g. defining gender sensitive indicators to assess who benefits or does not benefit, how and why).`,
//             `Men and women are not homogeneous groups, and it is important to recognize their diversity in terms of economic class, ethnicity, religion and other characteristics, as well as individual preferences and abilities. These diversities should also be taken into account when collecting and analyzing data, for example by breaking down the data further. There are detailed guides on collecting and analyzing gender-disaggregated data for rural development projects.`,
//             `A systematic process for collecting sex-disaggregated data should include asking gender questions as part of the research design, developing sex-disaggregation tools for the indicators of interest, collecting information from men and women, and analyzing the data to understand the differences. and gender similarities.`,
//             `In addition, to collect the information, the most convenient places and times for young women and men must be taken into account. Likewise, it must be taken into account that much of women's work is invisible and unpaid, so a greater effort must be made to identify it and see how it is linked to visible and paid work in order to create clarity about the workload of both genders. It is always recommended to start with questions that are easier and more manageable for young people to build confidence before moving on to more sensitive and complex questions.`,
//           ],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '9.2.1 Measuring Womens Econ Emp_FINAL_2015_UN Foundation',
//             tools: [
//               {
//                 id: 291,
//                 type: 'g',
//                 original:
//                   '9.2.0 Measuring Womens Econ Emp_FINAL_2015_UN Foundation - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A12.099Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle:
//               '9.2.2 Lessons in Theory of Change - Gender and Inclusion',
//             tools: [
//               {
//                 id: 292,
//                 type: 'g',
//                 original:
//                   '9.2.1.3 Lessons in Theory of Change - Gender and Inclusion - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A18.251Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '9.2.3 Measuring gender-transformative change. A review of literature and promising practices - CARE',
//             tools: [
//               {
//                 id: 293,
//                 type: 'g',
//                 original:
//                   '9.2.2.1 Measuring gender-transformative change. A review of literature and promising practices - CARE - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A22.784Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 294,
//                 type: 'g',
//                 original: '9.2.2.3 UN-Women Evaluation Handbook - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A32.299Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 295,
//                 type: 'g',
//                 original:
//                   '9.2.2.4 Measuring-womens-economic-empowerment_2020.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A39.479Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 4,
//             shortTitle:
//               '9.2.4 Guia para la elaboracion de indicadores de genero',
//             tools: [
//               {
//                 id: 296,
//                 type: 'g',
//                 original:
//                   '9.2.3.3  Guia para la elaboracion de indicadores de genero - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A44.297Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 297,
//                 type: 'none',
//                 original:
//                   '9.2.3.5 tool-kit-gender-equality-results-indicators.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A47.431Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//               {
//                 id: 298,
//                 type: 'none',
//                 original:
//                   '9.2.3.6 practical-guide-to-measuring-womens-and-girls-empowerment-in-impact-evaluations.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A55.533Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//               {
//                 id: 299,
//                 type: 'g',
//                 original:
//                   "9.2.3.7 Measuring Women's Empowerment in Agriculture_IFAD_2017 - G.pdf",
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A13.442Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 5,
//             shortTitle: '9.2.5 Gender Measures and Data in Covid-19 era',
//             tools: [
//               {
//                 id: 300,
//                 type: 'none',
//                 original:
//                   '9.2.4.3 Gender Measures and Data in Covid-19 era.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A19.858Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Knowledge creation and management',
//         description: `In this sub-section, various tools are presented to guide the systematization of YEE experiences in order to draw lessons learned from ongoing or completed processes that can serve as input for the formulation of new initiatives or making adjustments to existing ones.`,
//         content: {
//           mainContent: `Participatory systematization and documentation methodologies are those of ' Most Significant Change ' and ' Outcome Mapping' . They focus on results (or changes) and the process of change: what has been achieved, how, by whom and what has been the contribution of the intervention or project. The changes are first identified by the people who implement (or implemented) the intervention and these will be validated by other stakeholders who can identify more or different changes. Finally, all parties must agree to the identified changes, the contribution and their importance. This makes the statements more objective.

//                     Methodologies to systematize experiences in YEE projects, generally have 4 stages:

//                     Planning: where you work with the team in charge of systematization in creating the bases for the following stages to develop harmoniously and within the framework established by the work plan.
//                     Reconstruction : here the information from documents generated in the projects involved is synthesized and ordered, the additional information that can be obtained through interviews or through focus groups.
//                     Reflection: leads us to make a critical approach and a synthesis of experiences in order to enrich knowledge and / or produce new knowledge that will facilitate sustainable development.
//                     Communication and dissemination: covers the process of preparing the base document, validation, preparation and implementation of specific communication products, which guarantee the dissemination of the results of the systematization in the target group, complying with the established objectives.`,
//           subContents: [
//             `Within the framework of knowledge creation, it is recommended to build and document the business cases of successful initiatives (business cases) of investment in young people with a gender-transforming approach, from the perspective of the partner company (s) ( s) and young people. These types of cases can be used to convince decision makers from other companies and stakeholders to invest in the alliance with Plan for the economic empowerment of men and, especially, young women. Apart from being able to measure the value that this investment generates for the company, case documentation can help to generate better alignment between actors, as well as measure progress and adjust actions.`,
//           ],
//         },
//         image: stage9,
//         tools: [
//           {
//             id: 1,
//             shortTitle: '9.3.1 Outcome Harvesting',
//             tools: [
//               {
//                 id: 301,
//                 type: 'none',
//                 original: '9.3.1.2 Outcome Harvesting.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A32.383Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 2,
//             shortTitle: '9.3.2 Sustained-Effects-Economic-Empowerment_CGD_2016',
//             tools: [
//               {
//                 id: 302,
//                 type: 'g',
//                 original:
//                   '9.3.2.2 Sustained-Effects-Economic-Empowerment_CGD_2016 - G.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A36.322Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//           {
//             id: 3,
//             shortTitle:
//               '9.3.3 Using Youth Employment Program Beneficiary Data_S4YE_WB_2018',
//             tools: [
//               {
//                 id: 303,
//                 type: 'none',
//                 original:
//                   '9.3.3 Using Youth Employment Program Beneficiary Data_S4YE_WB_2018.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A40.791Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: `Examples and good practices`,
//         description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.`,
//         image: stage9,
//         content: {
//           mainContent: `The documents in this section are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.`,
//           subContents: [],
//         },
//         tools: [
//           {
//             id: 1,
//             shortTitle:
//               '9.4.1 How to Evaluate Economic Growth - whatworksgrowth.org',
//             tools: [
//               {
//                 id: 304,
//                 type: 'p',
//                 original:
//                   '9.4.1 How to Evaluate Economic Growth - whatworksgrowth.org - P.pdf',
//                 link:
//                   'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A44.986Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]
export const allDummyStages: any[] = [
  {
    id: 1,
    stageNumber: 1,
    title: 'Gender-sensitive labour market analysis',
    sections: [
      {
        id: 1,
        title: 'Labor market analysis',
        image: stage1,
        description:
          'As a first step to develop a Youth Economic Empowerment (YEE) project with a gender transformative approach, you need to analyse the local context and look at opportunities for employment and entrepreneurship for youth with special attention for young women. Involvement of training institutions and the private sector is key to align offer and demand of market driven skills..',
        content: {
          mainContent:
            'A labour market analysis will ensure that your YEE project responds to real needs and contexts. Here you can find some tools that will help you to analyse market opportunities for employment and entrepreneurship or to identify relevant curricula on soft kills and technical and vocational training. \n Knowing that women face more barriers to get (full-time) jobs or to be employed in jobs that are legally regulated, we included documents on recent trends in female employment and gender equality. Like this you can analyse existing gender inequalities, assesses the prospects for women on the labour market and identify ways to address issues such as the gender wage gap, female underemployment, social protection and job security for women.\n Some of these tools also provide ideas on how to improve inclusion of minority groups such as Lesbian, Gay, Transgender and Bisexual (LGTB) or ethnic minorities.',
          subContents: [
            ' To assist in the analysis of the situation of women in the world of work and gender equality in society, there are many documents on recent trends in female employment that examine the improvements achieved in the past decade (or the lack of improvements) and assesses the prospects for the female labor market by analyzing inequalities between men and women.',
            ' It is important to recognize that women are not only less likely than men to participate in the workforce, but when they do so, they are also more likely to be unemployed or employed in jobs that are outside of labor laws, regulations on social security and collective agreements.',
          ],
        },

        tools: [
          {
            id: 1,
            shortTitle: 'Tools for market analysis',
            tools: [
              {
                id: 3,
                type: 'p',
                original:
                  'Labour market policy statistics Methodology_ EU 2018',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A09%3A51.313Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 4,
                type: 'p',
                original: 'World Employment and Social Outlook_ ILO 2021',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A09%3A58.481Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: 'Recent trends in female employment',
            tools: [
              {
                id: 5,
                type: 'pg',

                original:
                  'Avance global sobre tendencias empleo femenino_ OIT 2018',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A18.963Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 6,
                type: 'pg',
                original:
                  'PepsiCo Summary of Situational Analysis Mexico_IYF 2021',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A23.468Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle: 'Global Employment Trends for Youth 2020_ILO',
            tools: [
              {
                id: 7,
                type: 'p',
                original: 'Global Employment Trends for Youth 2020_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A29.202Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: 'Powering-Youth-Employment-in-SSA_Mobile Industry',
            tools: [
              {
                id: 8,
                type: 'p',
                original:
                  'Powering-Youth-Employment-in-SSA_Mobile Industry_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A49.476Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle: 'Global Wage Report 2020-2021',
            tools: [
              {
                id: 9,
                type: 'p',
                original: 'Global Wage Report 2020-2021_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A10%3A59.846Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 6,
            shortTitle: 'Jobs in the Orange Economy',
            tools: [
              {
                id: 10,
                type: 'p',
                original: 'Jobs in the Orange Economy_WB_2020',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A04.877Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle:
              'S4YE Knowledge Brief 7 - Digital Jobs for Youth in FCV Settings',
            tools: [
              {
                id: 11,
                type: 'p',
                original:
                  'S4YE Knowledge Brief 7 - Digital Jobs for Youth in FCV Settings, Click-On Kaduna_WB_2019.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A10.183Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Market scan for youth employment and entrepreneurship',
        description:
          'The market scan and other mapping instruments on this website help you to evaluate the feasibility of implementing a YEE project for disadvantaged youth in a specific geographical area. Together with training institutes, public and private parties you can identify the main opportunities and threats, market-demanded job profiles and potential alliances, amongst many other elements.',
        image: stage1,
        content: {
          mainContent:
            'A market scan helps you to determine where the jobs are, what kind of jobs exist, who is hiring and what kind of skills are needed to get those jobs. By using different data collection tools disaggregated by sex while conducting the scan, you can triangulate the information and analyse the differences between young men and women on opportunities and barriers to develop skills and economic empowerment. \n The quick scan and other mapping instruments on this website help you to evaluate the feasibility of implementing a YEE project in a specific area. Together with training institutes, public and private parties you can identify the main opportunities and threats, market-demanded job profiles and potential alliances, amongst many other elements. \n YES!NTEL is a market scan solution developed by Plan International to identify opportunities and challenges by build-in questions based on ILO Methodology that guides users in their market scan assessments. \n On the platform, YES!NTEL, the market scan is conducted by collecting data and observations needed for responding to questions divided into 8 blocks. You don’t need to fill out every field in all the blocks but can make a selection according to the context of your project. The blocks include: country analysis, target area analysis, youth analysis, industry analysis, entrepreneurship, labour supply, company, and job profile.',
          subContents: [
            'This section not only refers to the analysis of the labor market but also to the identification of opportunities in the value chain for employment and entrepreneurship for young people, as well as for the construction of a joint vision, indicators and an improvement plan for inclusion of young women and men in entrepreneurship.',
            'In addition to qualitative research tools, quantitative mapping and research instruments , such as the online survey , can be used to generate the necessary inputs for the development of your YEE project.',
          ],
        },

        tools: [
          {
            id: '1.2.4 ',
            shortTitle: 'Rising to the Youth Employment Challenge',
            tools: [
              {
                id: 12,
                type: 'p',
                original:
                  'Rising to the Youth Employment Challenge_ILO_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A17.147Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: '1.2.5',
            shortTitle: 'Global Gender Gap Report',
            tools: [
              {
                id: 125,
                type: 'p',
                original: 'Global Gender Gap Report 2021_WEF_2021.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A25.646Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Gender analysis',
        description:
          'Around the world, finding a job is much tougher for women than it is for men. When women are employed, they tend to work in low-quality jobs in vulnerable conditions, and there is little improvement forecast in the near future.',
        image: stage1,
        content: {
          mainContent: ` 
          In order to offer equal opportunities for young women and men, you will need to take gender issues into account from the start of your YEE project development. During the preparation phase, this requires participatory methodologies for assessing gender sensitivity at private and public training institutes and other parties on the labour market at all levels of the value chain. \n
          
          Look at the example of the Gender Action Learning System (GALS), which provides a practical methodology to do this gender analysis together with your target group, even if they have low educational levels. \n
          
          The analysis of a value chain with a gender perspective is a methodology that describes the existing gender relations in a particular environment, ranging from the home, organization or company, to a larger scale of community, ethnic group or society. It helps you to organize and interpret information on gender relations in a systematic way and to clarify the importance of gender differences in achieving development objectives in a given value chain or labour market. Understanding gender dynamics that prevent women from participating in and benefiting from labour market opportunities will contribute to the success of your YEE project as well as to the overall development of the communities where your project takes place (see section 6.3 for tools on gender assessments in value chains). \n

          Don’t forget to also include an analysis of the mechanisms that include or exclude certain groups, such as the LGTBI+ community or ethnic minorities. \n 

          To be able to do a gender analysis you need to collect data disaggregated by sex. Also during the analysis of the collected data, the results and perceptions must continuously be differentiated for women and men. Try to understand the differences, explain them and use this information to formulate adequate (differentiated) responses for your project. \n

          Sex-disaggregated data is data related to individuals that is collected, analysed and presented separately for men, women and non-binary. You can also disaggregate by age and other sociodemographic characteristics, such as ethnic origin, economic class or sexual identity, depending on the context where your project will take place. Collecting and analysing data disaggregated by sex and other characteristics can help you target those youth that really need it, improve implementation, and conduct a more effective monitoring and evaluation process (e.g. defining gender sensitive indicators to assess who benefits or not how and why. See Phase 9). \n 

          A systematic process for collecting sex-disaggregated data should include asking gender questions as part of the research design, developing sex-disaggregated tools for the indicators of interest, collecting information from men and women, as well as analysing the data to understand the gender differences and similarities. You can use Plan International’s  YES!ME which is a gender sensitive online tool for the registration and monitoring of participants of YEE projects. Yes!Me is based on ILO methodology and contains several questions at different levels focused on understanding the situation, bias and challenges faced by youth, especially young women, to enter the labour market. \n 

         To collect the information, select the most convenient places and times for young women as well as men. Don’t forget that much of women’s work is invisible and unpaid; try to identify and link them to visible and paid work. 

         Always start with questions that are easier for young women and men to build confidence before moving on to more sensitive and complex questions.`,
          subContents: [
            'The tools allow conducting gender analysis in the context of any value chain or labor market sector to generate knowledge and then use the results of the analysis to inform the development of a new YEE project. Analysis of gender dynamics that prevent women from participating in and benefiting from value chains or the labor market is essential for the success of a YEE project and the overall development of value chains and labor markets.',
            'In this section of the toolbox you can find some model Terms of Reference (ToR) for conducting a gender analysis, as well as examples of ToR used for YEE projects worldwide (see also section 1.5). It is proposed to use a mix of quantitative and qualitative methods, which can include a variety of tools, such as questionnaires, checklists , analytical frameworks (such as Harvard), empowerment indexes, analytical tree, resource mapping and others.',
            'Users of this toolkit are encouraged to review them and apply those that are most applicable in the context in which their YEE project will be framed.',
            "Finally, it is recommended to check whether the information generated can answer the questions expressed in Plan International's House for the Analysis of Gender and Child Rights and develop a house with the respective answers as a general framework for the future YEE project.",
          ],
        },

        tools: [
          {
            id: 1,
            shortTitle: 'Gender Balance Tree GALS@Scale',
            tools: [
              {
                id: 14,
                type: 'g',
                original: 'Gender Balance Tree GALS@Scale - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A13%3A59.438Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 15,
                type: 'g',
                original: 'Mayoux 2014_Rocky Road manual - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A14%3A05.714Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: 'Agriprofocus-Caja_Herramientas',
            tools: [
              {
                id: 16,
                type: 'g',
                original: 'Agriprofocus-Caja_Herramientas - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A14%3A39.479Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 17,
                type: 'g',
                original:
                  'Agriprofocus-Toolkit Gender in Value Chains_Jan2014-G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A14%3A50.436Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 18,
                type: 'g',
                original:
                  'FAO Desarrollo de cadenas de valor sensibles al genero - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A14%3A58.949Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 19,
                type: 'g',
                original:
                  'FAO Developing gender sensitive value chains - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A04.670Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: 'Guidelines and criteria',
            tools: [
              {
                id: 20,
                type: 'g',
                original:
                  'Understanding causes of gender disparities in STEM-TVET_UNESCO_2020- G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A09.227Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle: 'Impact_covid-19_girls_africa_Plan_2020',
            tools: [
              {
                id: 21,
                type: 'g',
                original: 'Impact_covid-19_girls_africa_Plan_2020 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A14.297Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 6,
            shortTitle:
              'Gender and Youth Employment in the Commonwealth_challenges',
            tools: [
              {
                id: 22,
                type: 'pg',
                original:
                  'Gender and Youth Employment in the Commonwealth_challenges_ILO_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A26.380Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 7,
            shortTitle: 'GenderandyouthCIS_ILO_2020',
            tools: [
              {
                id: 23,
                type: 'pg',
                original: 'GenderandyouthCIS_ILO_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A31.911Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'Identification of target group and key actors',
        description:
          'Once you analysed the market with a gender perspective, you should define your potential target group. Specify this group as much as possible, taking into account sex, age, ethnicity, socio-economic and educational characteristics that are relevant in the context of the project.',
        image: stage1,
        content: {
          mainContent: `YEE projects focus on youth, which can be divided into adolescents (13-17 years), recent youth (18-25 years) and older youth (25-35 years). Your YEE project can act as a catalyst for integration if you target those groups that have not had the same opportunities as others. This can be the NEET group: men and women who are not employed and not receiving education or vocational training. \n
          Special attention to girls and young women is key, since they might not be looking for work (and therefore will not show in the unemployment data) due to the obstacles they face, such as a lack of day care for their children, household responsibilities or being rejected beforehand based on their reproductive age. Other groups that are often left behind are the LGBTI+ community, people with a disability or indigenous youth. \n
          Once you defined your target group, make a mapping of other potential actors from the private, public and civic sectors such as:
         -	Technical and Vocational Education and Training (TVET) institutions that offer (or could offer) the necessary curricula and training; 
         -	Companies that could hire people from your target group; 
         -	Public entities that have the responsibility of providing the regulatory framework and education or employment related public services; 
        -	Academic institutions that can conduct research on the sector with a gender perspective; 
        -	Non-governmental, producers’, youth-led or community-based organizations that can mobilise and promote activities with the target population. \n 
         The goal of this mapping is to identify strategic alliances that can be strengthened during the project in order to achieve sustainability of the project’s results after the project is finished (see also Phases 7 and 8). This means when you are looking for possible TVET institutions as allies, you should target those that will be serving the target population long after the project has finished. Make a gender assessment of their capacities to successfully train young people in the required vocational and technical skills that you identified in the market analysis. Define how the project can help to strengthen these institutions that are key for the sustainability of your project, such as knowledgeable teachers, adequate training facilities, useful equipment and training modules that fulfil market demands and reach also young women. \n
         Possible international strategic alliances could be established with:
        -	The Inter-American Centre for Knowledge Development in Vocational Training (CINTERFOR) of the International Labour Organization (ILO). CINTERFOR supports vocational training bodies, develops and manages knowledge in vocational training, promotes cooperation and research, and contributes to the management of public policies on vocational training.
        -	The International Training Centre of the ILO (ITCILO), which gives courses, including on gender equality and diversity.`,
          subContents: [
            `A possible strategic alliance could be with the Inter-American Center for the Development of Knowledge in Vocational Training (CINTERFOR) of the International Labor Organization (ILO) ( www.ilo.org/public//spanish/region/ampro/cinterfor/temas /gender/index.htm ). CINTERFOR supports vocational training bodies, develops and manages knowledge in vocational training, promotes cooperation and research, and contributes to the management of public policies on vocational training.`,
            `Another possibility for a strategic alliance is the International Training Center of the ILO, which gives courses, among others on the subject of gender, equality and diversity ( www.itcilo.org/es/areas-de-especializacion/genero-igualdad- y-diversity? set_language = es ).`,
          ],
        },

        tools: [
          {
            shortTitle: 'Mujeres en STEM_UNESCO_2017_SP',
            tools: [
              {
                id: 24,
                type: 'pg',
                original: 'Mujeres en STEM_UNESCO_2017_SP - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A39.283Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 25,
                type: 'pg',
                original: 'Mulheres en STEM_UNESCO_2017_PO - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A46.247Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 26,
                type: 'pg',
                original: 'Women in STEM_UNESCO_2017_EN - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A15%3A55.038Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 27,
                type: 'none',
                original:
                  'Youth employment from public to private sector_IDRC_2016_Ethiopia.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A03.754Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 28,
                type: 'none',
                original:
                  'S4YE.Digital.Jobs_.for youth.with_.disabilites_WB_2021.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A10.208Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: 'Examples and good practices',
        description: `In this section you can find a variety of documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.`,
        image: stage1,
        content: {
          mainContent: `In addition to the documents in this section you can find key ILO documents, international labour standards, statistics, useful links and other resources in the ILO library.

          The documents are organized by topic such as youth employment and gender equality.`,
          subContents: [],
        },

        tools: [
          {
            id: 1,
            shortTitle: 'ILO World Employment',
            tools: [
              {
                id: 29,
                type: 'p',
                original: 'ILO World Employment Social Outlook - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A15.304Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 30,
                type: 'none',
                original: 'OIT Perspectivas Sociales Empleo Mundo.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A20.997Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              'Examples. market analysis skills for youth in mogadishu',
            tools: [
              {
                id: 31,
                type: 'p',
                original:
                  'Examples. market analysis skills for youth in mogadishu.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A25.540Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle: 'OIT Futuro mejor mujeres trabajo',
            tools: [
              {
                id: 32,
                type: 'g',
                original: 'OIT Futuro mejor mujeres trabajo - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A32.124Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 33,
                type: 'g',
                original:
                  'Standars for collection sex-disaggregated data_CGIAR 2013 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A43.038Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 34,
                type: 'g',
                original:
                  'Towards a better future-women in work_ILO_2017 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A16%3A48.306Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 35,
                type: 'g',
                original:
                  'USAID_spring_bangladesh_womens_empower_index_2017 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A02.027Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 36,
                type: 'g',
                original: 'WEAI-Intervention_Guide_2016 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A08.170Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    stageNumber: 2,
    title: 'Design and delimitation of your YEE project',
    sections: [
      {
        id: 1,
        title: `Definition of vision and Theory of Change`,
        description: `In this second phase, you design you YEE project based on the information generated in Phase 1. You need to do this in close collaboration with the target group and other identified key actors. This begins by defining a shared vision and the change you want to achieve.`,
        image: stage2,
        content: {
          mainContent: `Start Phase 2 with developing a shared vision and the Theory of Change (ToC) needed to reach that vision. Don’t forget to include a gender transformative approach based on Plan's gender equality criteria! \n

          The ToC of your YEE project should include the goals you want to achieve and clear indicators to measure the progress and achievement of these goals. Don’t forget to involve women and men in the development of the indicators and in the collection and analysis of information (see Phase 9 on monitoring and evaluation). \n
          
          Once you have defined your ToC you will need to develop your project proposal and budget. Useful guidelines and resources to support this are presented in Phase 8.`,
          subContents: [
            `This phase also includes the elaboration of a business plan model  for your project and a description of tasks, roles and positions in the framework of carrying out your YEE project.`,
            `Plan International has developed a series of recommendations for the design and delimitation of your YEE project that you can find in the Tools section`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: 'ES_SOYEE Theory of Change',
            tools: [
              {
                id: 37,
                type: 'none',
                original: 'ES_SOYEE Theory of Change.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A17.797Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 38,
                type: 'none',
                original: 'PT_SOYEE Theory of Change.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A22.713Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 39,
                type: 'none',
                original: 'ES_SOYEE Brochure.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A28.038Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 40,
                type: 'none',
                original: 'PT_SOYEE Brochure.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A33.160Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 41,
                type: 'none',
                original: 'ES_SOYEE.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A38.278Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 42,
                type: 'none',
                original: 'PT_SOYEE.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A17%3A51.692Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 43,
                type: 'none',
                original:
                  'How To Note Issue 1_How To Include Youth Voice In Youth Employment Programs_WB_2021.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A02.855Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 44,
                type: 'none',
                original:
                  'S4YE Knowledge Brief 10.Youth Employment Programs and COVID_WB_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A07.360Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              'Promocion de la Iniciativa Empresarial y el Empleo de Jovenes en LAM_OIT_2015',
            tools: [
              {
                id: 45,
                type: 'p',
                original:
                  'Promocion de la Iniciativa Empresarial y el Empleo de Jovenes en LAM_OIT_2015 - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A12.279Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 46,
                type: 'p',
                original:
                  ' Promocio╠ün del Emprendimiento y la Innovacio╠ün Social Juvenil en America Latina_OIT_2016 - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A17.395Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle: 'LSCE Conceptual and Programmatic Framework_EN',
            tools: [
              {
                id: 47,
                type: 'none',
                original:
                  ' LSCE Conceptual and Programmatic Framework_EN.pdf .pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A24.977Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 48,
                type: 'g',
                original: 'Critical factors youth empoyment_Plan_2017 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A33.987Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 49,
                type: 'none',
                original:
                  ' Factores Cr├¡ticos Programas Empleo Juvenil Basado en Destrezas-Plan & Accenture.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A38.697Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 50,
                type: 'none',
                original: ' women_in_the_wind_Plan_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A47.607Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 51,
                type: 'none',
                original:
                  'Addressing Employment Obstacles for Young Syrian Refugee Women_WB_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A54.367Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle:
              'Youth Voices Knowledge Brief Issue 11_How Technology Can Help Incorporate Youth Voice In Employment Programs_WB_2020',
            tools: [
              {
                id: 52,
                type: 'none',
                original:
                  'Youth Voices Knowledge Brief Issue 11_How Technology Can Help Incorporate Youth Voice In Employment Programs_WB_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A18%3A57.895Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle: 'Impact Portfolio Report_WB_2017',
            tools: [
              {
                id: 53,
                type: 'none',
                original: 'Impact Portfolio Report_WB_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A03.684Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 6,
            shortTitle:
              'Guidelines for integrated youth employment programs_WB.pdf',
            tools: [
              {
                id: 54,
                type: 'none',
                original:
                  'Guidelines for integrated youth employment programs_WB.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A10.648Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 7,
            shortTitle:
              'Stocktake of evidence on Youth Employment Programs_WBG_2018',
            tools: [
              {
                id: 55,
                type: 'none',
                original:
                  'Stocktake of evidence on Youth Employment Programs_WBG_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A17.405Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 8,
            shortTitle: 'S4YE.FACTBOOK_WB_2020',
            tools: [
              {
                id: 56,
                type: 'none',
                original: 'S4YE.FACTBOOK_WB_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A22.117Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 9,
            shortTitle: 'Meeting the Challenge of Youth Unemployment _WB',
            tools: [
              {
                id: 57,
                type: 'none',
                original: 'Meeting the Challenge of Youth Unemployment _WB.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A34.919Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: `Definition of vision and Theory of Change`,
        description: `In this second phase, you design you YEE project based on the information generated in Phase 1. You need to do this in close collaboration with the target group and other identified key actors. This begins by defining a shared vision and the change you want to achieve.`,
        image: stage2,
        content: {
          mainContent: `Start Phase 2 with developing a shared vision and the Theory of Change (ToC) needed to reach that vision. Don’t forget to include a gender transformative approach based on Plan's gender equality criteria!\n

          The ToC of your YEE project should include the goals you want to achieve and clear indicators to measure the progress and achievement of these goals. Don’t forget to involve women and men in the development of the indicators and in the collection and analysis of information (see Phase 9 on monitoring and evaluation). \n
          
          Once you have defined your ToC you will need to develop your project proposal and budget. Useful guidelines and resources to support this are presented in Phase 8. 
          `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              'ILO_QualityApprenticeshipToolkit_I_Guide for Policy Makers_2017',
            tools: [
              {
                id: 58,
                type: 'none',
                original:
                  'ILO_QualityApprenticeshipToolkit_I_Guide for Policy Makers_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A45.875Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 59,
                type: 'none',
                original:
                  'Manual de Herramientas de la OIT para Aprendizajes de Calidad_Vol I para Formuladores de politiccas_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A51.408Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 60,
                type: 'none',
                original:
                  "Outils pour des Apprentissages de Qualite_Vol I Guide de OIT a l'intention des decideurs politiques_2017.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A19%3A56.526Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              'Setting_the_agenda_the_girls_platform_for_action_Plan_2020',
            tools: [
              {
                id: 61,
                type: 'g',
                original:
                  'Setting_the_agenda_the_girls_platform_for_action_Plan_2020 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A03.900Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              'Guia Didactica incorporaci├│n enfoque de g├®nero en formaci├│n profesional',
            tools: [
              {
                id: 62,
                type: 'g',
                original:
                  'Guia Didactica incorporaci├│n enfoque de g├®nero en formaci├│n profesional - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A26.633Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 63,
                type: 'g',
                original:
                  'Gender and economics training manual - UN-Women - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A33.801Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: 'Guia prevenci├│n discriminacion TVET - INSAFORP',
            tools: [
              {
                id: 64,
                type: 'g',
                original:
                  'Guia prevenci├│n discriminacion TVET - INSAFORP - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A39.535Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 65,
                type: 'g',
                original: 'Igualdad de g├®nero, rompiendo estereotipos - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A51.210Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 66,
                type: 'gp',
                original:
                  'OIT guia para la accion - Igualdad de ge╠ünero y no discriminacio╠ün en la gestio╠ün del empleo - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A20%3A56.535Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 67,
                type: 'g',
                original: ' Unconsious gender bias at the workplace - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A03.704Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle: 'European Entrepreneurship Competence Framework',
            tools: [
              {
                id: 68,
                type: 'none',
                original: 'European Entrepreneurship Competence Framework.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A07.800Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 69,
                type: 'none',
                original: ' Student Entrepreneurship Toolkit.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A23.240Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 6,
            shortTitle: 'Una economia para mujeres - OXFAM',
            tools: [
              {
                id: 70,
                type: 'g',
                original: ' Una economia para mujeres - OXFAM - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A39.033Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: `TVET curriculum development`,
        description: `Technical and Vocational Education and training (TVET) curricula must be well prepared and meet relevant and applicable government requirements to achieve the necessary certification. It is also key to include recommendations of the private sector, to make sure the learned skills align with the ones demanded in the labour market.`,
        image: stage2,
        content: {
          mainContent: `When designing the courses you should take into account the desired level of qualification, type of certification and other guidelines established by the national government. The results of your labour market analysis as well as the identification and mobilisation of the target group and other actors (Phase 1 to 3) will be very helpful during this process. \n

          There is a wide range of possible courses you can offer. You will not only have to take decisions regarding the content but also regarding the length, level of formality, type of trainings (e.g. more theory, practice or both) and ways to conduct them (online vs face-to-face or a combination of both). Include your target group and potential future employers in the development and validation of the TVET curricula to make sure they align with their needs. \n
          
          Specifically include young women, LGBT+ people and ethnic minorities in the curriculum development to avoid gender stereotyping and discrimination in TVET. In order to catalyse more equal power relations, you can focus on sensitizing male and female students, teachers and employers as well as teaching women and minority groups about their rights to enable a safe environment for empowerment. \n
          
          In addition to the employment curriculum, you might want to develop a curriculum for entrepreneurship. This requires not only identifying youth with the skills and talent for entrepreneurship, but also sharing practical examples with TVET students about setting up their own business as alternative for employment. \n
          
          Crucial factors for the success and sustainability of young people's business initiatives are motivation, self-esteem and economic empowerment to be able to face the associated risks and insecurity. The curriculum should prepare students for the dynamics of the business world; to accept and manage risk and uncertainty related to entrepreneurship; and help them develop a growth mindset as well as decision-making and other leadership skills required for managing the business. \n
          
          Curricula should include specific attention to female entrepreneurship to awake the interest of young women and equip them to face challenges that are regularly greater than those faced by men.`,
          subContents: [
            `The strategy with a gender transformative approach must have sufficient human and financial resources to be able to execute it. This includes developing the budgets of the YEE project (as well as of the FTP institutions, companies and other entities) with a gender perspective. The budgets with a gender approach is developed based on gender analysis and defined strategy, and should be aimed at an equitable distribution of resources. These resources refer to financial resources, material resources (computers, infrastructure) as well as human resources. The gender budget does not only mean a differentiated use by gender of certain funds but also focuses on the interaction of expenditures with other resources.`,
            `Developing budgets with a gender approach refers to the process of conceiving, planning, approving, executing, monitoring, analyzing and auditing budgets in a gender-sensitive manner. It involves the analysis of the actual expenses and income (of the project, a company, FTP institution or other instance) in women and girls compared to the expenses in men and boys. It helps to decide how the objectives and strategies of the projects should be formulated and is a tool for the effective implementation of projects since it allows to verify if the assignments are in line with the objectives and strategies in order to obtain the desired impact.`,
            `The specific budget or the proportion of the general budget of the FTP project / institution / company, which should be allocated to gender activities depends on the strategy developed. Furthermore, budgets are often intertwined, as not only will gender-specific activities be developed, but already planned activities can also be made more gender-sensitive (for example, by setting a quota for women's participation).`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: 'Women Economic Empowerment_CGD_2016',
            tools: [
              {
                id: 71,
                type: 'g',
                original:
                  '2.3.0 - 9.2.0 Women Economic Empowerment_CGD_2016 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A42.721Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 72,
                type: 'g',
                original:
                  '2.3.0 - 9.2.0 Women Economic Empowerment_CGD_2016_summary - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A49.786Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '2.3.2 Gender equality & decent work - ILO',
            tools: [
              {
                id: 73,
                type: 'g',
                original: '2.3.1.1 Gender equality & decent work - ILO - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A21%3A53.475Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 74,
                type: 'g',
                original:
                  '2.3.1.2 Convencio╠ün sobre la eliminacio╠ün de todas las formas de discriminacio╠ün contra la mujer Espan╠âol - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A00.026Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 75,
                type: 'none',
                original: '2.3.1.3 CEDAW full convention_OHCHR.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A06.788Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 76,
                type: 'none',
                original:
                  '2.3.11 Guideline on Inclusion of Marginalised People in TVET_GIZ_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A09.858Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 77,
                type: 'none',
                original:
                  '2.3.12 Including Persons with Disabilities in TVET_ILO_2016.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A18.256Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 78,
                type: 'g',
                original: '2.3.13a S4YE Digital Jobs Report - WB_2018 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A23.375Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 79,
                type: 'g',
                original:
                  '2.3.13b S4YE Digital Jobs Report - Executive Summary_WB_2018 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A33.821Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 80,
                type: 'g',
                original:
                  '2.3.14 S4YE Knowledge Brief 8 - E-Work Opportunities for Young Women in Gaza_WB_2019 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A39.760Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '2.3.3 Gender mainstreaming in TVET Bangladesh ILO 2015',
            tools: [
              {
                id: 81,
                type: 'g',
                original:
                  '2.3.3.10 Gender mainstreaming in TVET Bangladesh ILO 2015 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A44.266Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 82,
                type: 'g',
                original:
                  '2.3.3.11 Gender-responsiveness-tvet-vietnam_ADB_2020 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A48.977Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 83,
                type: 'g',
                original:
                  '2.3.3.5 Empoderamiento Econ├│mico de las Mujeres - AgriProfocus - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A51.845Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 84,
                type: 'none',
                original: '2.3.3.6 MakingWomensWorkVisibleReport_FINAL.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A22%3A55.584Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 85,
                type: 'g',
                original:
                  '2.3.3.7 Skills Education and Training for Girls_Unicef_2018 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A00.139Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 86,
                type: 'none',
                original:
                  '2.3.3.8 Mainstreaming Gender into Decent Work Programmes Africa_ILO_2016.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A14.374Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 87,
                type: 'g',
                original:
                  '2.3.3.9 gender-mainstreaming-strategy-for-achieving-gender-equality-and-empowerment-of-women-girls_UNWOMEN_2018 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A18.932Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle:
              '2.3.4 Value chain development and Gender - Agriprofocus',
            tools: [
              {
                id: 88,
                type: 'g',
                original:
                  '2.3.4.3 Value chain development and Gender - Agriprofocus - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A22.566Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 89,
                type: 'g',
                original:
                  '2.3.4.4 Value chain development and Gender - Agriprofocus - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A27.276Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 90,
                type: 'none',
                original:
                  '2.3.4.5 A_business_case_for_gender_equality_NewForeSight-AgriProFocus_Dec 2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A31.168Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 91,
                type: 'g',
                original: '2.3.4.5 Gender-Toolkit in Value Chains-IDH - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A35.415Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 92,
                type: 'none',
                original:
                  '2.3.4.6a Infographic_Women_Economic_Empowerment_Framework_ENG.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A43.474Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 93,
                type: 'none',
                original:
                  '2.3.4.6b Infographic_Women_Economic_Empowerment_Framework_AgriProFocus_ENG Asian.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A47.145Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 94,
                type: 'none',
                original:
                  '2.3.4.6c Infographic_Women_Economic_Empowerment_Framework_AgriProFocus_and_Fair_&_Sustainable_ESP.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A50.625Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 95,
                type: 'none',
                original:
                  '2.3.4.6d Infographic_Women_Economic_Empowerment_Framework_FRA.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A23%3A54.825Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 96,
                type: 'none',
                original:
                  '2.3.4.6e Empoderamento_Econo╠émico_das_Mulheres_POR.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A02.505Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 97,
                type: 'none',
                original:
                  '2.3.4.6f Infographic_Women_Economic_Empowerment_Framework_AgriProFocus_and_Fair_&_Sustainable_Indonesian.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A06.396Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 98,
                type: 'none',
                original:
                  '2.3.4.7a Reach_Benefit_Empower_framework_infographic_Fair_and_Sustainable_EN-_African.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A10.287Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 99,
                type: 'none',
                original:
                  '2.3.4.7b Reach_Benefit_Empower_framework_infographic_Fair_and_Sustainable_EN-Asian.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A14.588Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 100,
                type: 'none',
                original:
                  '2.3.4.7c Reach_Benefit_Empower_framework_infographic_Fair_and_Sustainable_FR-African.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A18.482Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 101,
                type: 'none',
                original: '2.3.4.7d Alcanc╠ºar_Beneficiar_Empoderar_POR.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A22.780Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle:
              '2.3.5 Practical tips for communicating research findings gender-responsive',
            tools: [
              {
                id: 102,
                type: 'g',
                original:
                  '2.3.5.2 Practical tips for communicating research findings gender-responsive - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A27.184Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 103,
                type: 'g',
                original:
                  '2.3.5.3 Gender Seal-Principles of gender-sensitive communications - UNDP - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A30.359Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 6,
            shortTitle: '2.3.6 Gender Budgeting - EIGE',
            tools: [
              {
                id: 104,
                type: 'g',
                original: '2.3.6 Gender Budgeting - EIGE - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A35.379Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 7,
            shortTitle:
              '2.3.7 Boosting_gender_equality_in_science_and_technology_UNESCO-2020',
            tools: [
              {
                id: 105,
                type: 'g',
                original:
                  '2.3.8 Boosting_gender_equality_in_science_and_technology_UNESCO-2020 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A39.371Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: `Inclusion of a gender transformative approach `,
        description: `Gender equality is included in a wide range of international human rights frameworks and standards, including ILO conventions on workers' rights and the Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW). You can include it in your YEE project by formulating a gender transformative strategy based on the gender analysis you conducted in Phase 1.`,
        image: stage2,
        content: {
          mainContent: `Nowhere in today’s world are young women and young men treated equally. Only through a gender transformative approach will we be able to tackle this. Gender inequality affects us all but is particularly unfair to girls and women. Being a girl or a woman most often means being valued less, having fewer opportunities and less pay for the same job, and facing stronger barriers to rights and more gender-based violence than their male peers. Although boys and men often benefit from this inequality, they also experience a fair share of negative consequences. Society traditionally imposes strict expectations upon them, such as showing strength and hiding feelings. These expectations get in the way of building healthy relationships and often lead them to high-risk behaviours. \n

          Plan’s gender transformative approach aspires to change this reality. It tackles the root causes of gender inequality and reshapes unequal power relations. It focuses not only on providing equal opportunities and outcomes for all, but on removing the barriers that keep girls from achieving their full potential and exercising their rights. \n
          
          To facilitate and articulate a clear vision of what and how to implement a gender transformative approach Plan has identified six essential elements which are interconnected and mutually reinforcing: \n
          1.	It is paramount to understand and address how gender norms influence children throughout their life-course, from birth to adulthood; \n 
          2.	We need to strengthen girls’ and young women’s agency over the decisions that affect them, as well as to build their knowledge, confidence, skills and access to and control over resources; \n
          3.	We need to work with and support boys, young men and men to embrace positive masculinities and to promote gender equality, while also achieving meaningful results for them; \n
          4.	We need to consider girls, boys, young women and young men in all their diversity when identifying and responding to their needs and interests; \n
          5.	We need to both improve the conditions (daily needs) but most importantly focus our work in improving the social position (value or status) of girls and young women; \n
          6.	To ensure a sustainable outcome we need to foster an enabling environment (including with policies) where all stakeholders work together to support children and youth on their journey towards gender equality. \n

          Mainstreaming gender into your YEE project means integrating the needs and experiences of both women and men in the design, implementation, monitoring and evaluation. Your gender mainstreaming strategy should include specific objectives, activities, budgets, key actors and SMART indicators. This requires understanding the definitions of gender and creating a joint vision for gender equality. \n

          Gender mainstreaming is not only relevant for employment but also for entrepreneurship, including in rural areas. See section 6.3 for tools on incorporating a gender perspective in agricultural value chains, which you can use to support young people’s entrepreneurships or cooperatives in rural areas. \n

         Make sure you assign sufficient human and financial resources to be able to execute your gender transformative strategy. This requires developing the budget of your project (so called Gender budgeting) as well as those of TVET institutions, companies and other parties including budget to implement activities to address the aspects mentioned before. \n

        Central to gender budgeting, is the equitable distribution of all resources; financial resources, material resources (computers, infrastructure) and human resources. It involves the analysis of the actual expenses and income dedicated to women and a comparison to men. This tool allows you to verify if budget allocation is in line with the objectives and strategies. Budgets are often intertwined as you can develop gender-specific activities, but also make already planned activities more gender-sensitive (e.g., by setting a quota for women's participation). \n

        Don’t forget to use inclusive language in all your project documentation (from the proposal, theory of change and implementation strategy to progress reports and training curricula). For example, refer to police officer instead of policeman and flight attendant instead of stewardess.`,
          subContents: [
            `Gender-sensitive companies / institutions must be identified or, at a minimum, open to entering into a staff awareness and institutional strengthening process to develop the capacity to promote a gender-sensitive workplace or education with equal opportunities and benefits for women and men. One way to convince companies is to make them understand that greater equality will translate into more profits and better business ( greater equality = better business). Having more diverse teams also results in improved performance. One factor may be that diverse teams bring together multiple perspectives, allowing for a more holistic analysis of problems encountered at work. In addition, companies open to greater diversity in their staff are more likely to take advantage of the talents available in different population groups in terms of gender, ethnicity, age, and so on.`,
            `Based on the development opportunities identified in the market scan and gender analysis, it is recommended to include in the design the management of alliances with companies in the region. On the one hand, to open spaces for articulation with production units that, due to their level of progress and consolidation, can be integrated into new markets, becoming providers of services, supplies of raw materials or products that allow increasing business opportunities. On the other hand, in relation to the employability component, to establish alliances for the employment of young people who will participate in the project. Specifically, conferences or business meetings can be sponsored for this purpose.`,
            `Every company and institution must have and implement a formal policy regarding gender equality, and include it in the reports on human resources. A gender-sensitive work policymust provide: A nondiscrimination clause; Equal opportunities with respect to hiring, remuneration, promotion, training; Quotas of women in decision-making positions; Maternity and paternity leave; Flexible work hours; Access to child care; Gender-sensitive facilities, such as separate bathrooms, breastfeeding spaces; Safety and health, including policies against sexual harassment and an objective professional person to speak to. However, more is needed than developing formal policies and rules regarding gender: awareness and skills of staff and management must be worked on so that they are truly implemented and respected.

                        The info-story on the gender gap in employment is recommended: what slows the advancement of women? ( www.ilo.org/infostories/es-ES/Stories/Employment/barriers-women#global-gap ) as learning or to be used in awareness-raising work with potential employer companies and other key stakeholders.`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: '2.4.1 Corporate Engagement - YEE Workshop 28Jan16 ADP',
            tools: [
              {
                id: 106,
                type: 'p',
                original:
                  '2.4.1.1 Corporate Engagement - YEE Workshop 28Jan16 ADP - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A45.450Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 107,
                type: 'p',
                original:
                  '2.4.1.3 Corporate Engagement  Partnerships Training - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A50.226Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '2.4.2 Mainstreaming gender justice approach_Oxfam Novib_english',
            tools: [
              {
                id: 108,
                type: 'g',
                original:
                  '2.4.2.1 Mainstreaming gender justice approach_Oxfam Novib_english - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A24%3A59.236Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 109,
                type: 'g',
                original:
                  '2.4.2.1 Mainstreaming gender justice approach_Oxfam Novib_portugues - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A04.562Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 110,
                type: 'none',
                original:
                  '2.4.2.3 Economic gender gap by institutions-UNU-2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A10.707Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '2.4.3 Gender Equality in Academia and Research_EIGE_2016',
            tools: [
              {
                id: 111,
                type: 'g',
                original:
                  '2.4.3.4 Gender Equality in Academia and Research_EIGE_2016 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A15.437Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 112,
                type: 'g',
                original:
                  '2.4.3.5 Institution guidelines gender in TVET_UNESCO-2018 -G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A20.538Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle:
              '2.4.4 Investing in Girls & Women -a Good Business - Girls Advocacy Alliance',
            tools: [
              {
                id: 113,
                type: 'g',
                original:
                  '2.4.4.2 Investing in Girls & Women -a Good Business - Girls Advocacy Alliance - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A24.840Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 114,
                type: 'gp',
                original:
                  '2.4.4.3 Companies as employer and gender - AgriProFocus - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A38.152Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 115,
                type: 'g',
                original:
                  '2.4.4.4 Empoderamiento Economico de las Mujeres IADB - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A41.989Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 116,
                type: 'none',
                original: '2.4.4.5 Investment in girls_.textClipping',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A46.139Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 117,
                type: 'g',
                original: '2.4.4.5 Investment in girls_Plan-Citi_2020 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A49.007Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: `Establishing strategic alliances`,
        description: `The success of your YEE projects stands or falls with the formation and management of the right alliances and public-private partnerships. These processes are time consuming as they lay the foundation for intensive collaboration throughout the project period and, at best, well beyond.`,
        image: stage2,
        content: {
          mainContent: `Entrepreneurship and youth social innovation thrive by the creation of public - private partnerships and multiparty networks. You can start establishing these alliances from the beginning of your YEE project, using participatory methodologies to ensure that the different objectives and interests that each party may have will be part of the project. At the same time, these methodologies will help you to define the strengths and resources they can bring to the table. \n

          Any organisation has its own bias in relation to gender inequalities. Therefore, a gender perspective must also be integrated at the internal institutional level of involved parties. This can be achieved through gender policies, strategies, work tools, trainings, and other gender structures within public institutions, companies and other project partners. \n
          
          For managing alliances with a gender lens, you can look at three sectors: \n
          -	TVET institutions offering good quality trainings and equal opportunities for young women and men. \n
          -	Government authorities for the coordination with other YEE projects and compliance with national legislation and policies on TVET and gender. \n
          -	Companies from the private sector to align TVET trainings and other youth employment support activities with their needs and to ensure gender sensitive work environments. \n
          
          Try to identify gender-sensitive companies and institutions that are open to strengthening their capacities to promote workplaces and education with equal opportunities and benefits for women and men. Build business cases with private sector partners to show how greater equality will translate into more profits and better business. Companies that are open to greater diversity in their staff are more likely to take advantage of the talents available in different gender, ethnicity or age groups. Moreover, diverse teams bring together multiple perspectives, allowing for a more holistic analysis of problems encountered at work. \n
          
          See the Tools section for business case examples developed by Plan International together with private sector partners in Indonesia and the Philippines. \n
          
          Use the information from your market scan and gender analysis to identify potential alliances with companies in the region that can offer a workplace or support entrepreneurship based on their experience in the market. You can set up conferences or business meetings for this purpose.\n
          
          See genderatwork.org for a collection of resources on how to achieve gender transformative change at your company or organisation. \n
          
          Your project can support partners in developing and implementing a gender equality policy at all levels of the company or institution. A gender-sensitive work policy provides: \n
          -	A non-discrimination clause; \n
          -	Equal opportunities with respect to hiring, remuneration, promotion, training; \n
          -	Quotas for women in decision-making positions; \n
          -	Maternity and paternity leave; \n
          -	Flexible work hours; \n
          -	Access to child care; \n
          -	Gender-sensitive facilities, such as breastfeeding spaces; \n
          -	Safety and health, including policies against sexual harassment and an objective professional person to speak to. \n
          
          Finally, your project can raise the necessary awareness and strengthen skills of management and staff to put these formal gender policies into practice. \n
          
          Explore the InfoStory The gender gap in employment: What’s holding women back? To get the data behind trends and learn more about the different barriers holding women back from decent work.`,
          subContents: [
            `The baseline investigation must use both quantitative and qualitative methods to report on the current status of the indicators and facilitate their understanding from the point of view of the target population and other actors involved in the project to be developed. At the end of the day, the project is developed for the benefit of the target population and it is that population with the other actors involved that must ensure the sustainability of the results to be measured at the end of the interventions, applying the same research methods as during the baseline.

                        `,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: '2.5.1 S4YE Baseline Report 2015_Full Report_WB',
            tools: [
              {
                id: 118,
                type: 'none',
                original: '2.5.2a S4YE Baseline Report 2015_Full Report_WB.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A56.388Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '2.5.2 S4YE Baseline Report 2015_Summary_WB',
            tools: [
              {
                id: 119,
                type: 'none',
                original: '2.5.2b S4YE Baseline Report 2015_Summary_WB.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A26%3A03.754Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: `Developing a baseline`,
        description: `Once you designed your project and formulated its theory of change with SMART indicators and a gender perspective (see Phase 9), you should develop a gender-sensitive baseline before starting project activities.`,
        image: stage2,
        content: {
          mainContent: `The baseline provides a photograph of the initial situation. A complete baseline study uses both quantitative and qualitative methods to report on the current status of the project’s indicators and facilitate understanding from the viewpoint of the target group and other parties. In the end it is the target group who should benefit from the project and, together with the other project partners, ensure that the achieved goals will be sustainable. You can repeat the same study when the project has finished to evaluate the impact of the interventions and the fulfilment of your goals.`,
          subContents: [
            `The baseline investigation must use both quantitative and qualitative methods to report on the current status of the indicators and facilitate their understanding from the point of view of the target population and other actors involved in the project to be developed. At the end of the day, the project is developed for the benefit of the target population and it is that population with the other actors involved that must ensure the sustainability of the results to be measured at the end of the interventions, applying the same research methods as during the baseline.

                        `,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: '2.5.1 S4YE Baseline Report 2015_Full Report_WB',
            tools: [
              {
                id: 118,
                type: 'none',
                original: '2.5.2a S4YE Baseline Report 2015_Full Report_WB.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A56.388Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '2.5.2 S4YE Baseline Report 2015_Summary_WB',
            tools: [
              {
                id: 119,
                type: 'none',
                original: '2.5.2b S4YE Baseline Report 2015_Summary_WB.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A26%3A03.754Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 7,
        title: `Examples and good practices`,
        description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.`,
        image: stage2,
        content: {
          mainContent: `The baseline study provides a photograph of the initial situation, which can be repeated in the middle of the period and when the project has finished to evaluate the impact of the activities carried out and the fulfillment of the goals set.`,
          subContents: [
            `The baseline investigation must use both quantitative and qualitative methods to report on the current status of the indicators and facilitate their understanding from the point of view of the target population and other actors involved in the project to be developed. At the end of the day, the project is developed for the benefit of the target population and it is that population with the other actors involved that must ensure the sustainability of the results to be measured at the end of the interventions, applying the same research methods as during the baseline.

                        `,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: '2.5.1 S4YE Baseline Report 2015_Full Report_WB',
            tools: [
              {
                id: 118,
                type: 'none',
                original: '2.5.2a S4YE Baseline Report 2015_Full Report_WB.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A25%3A56.388Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '2.5.2 S4YE Baseline Report 2015_Summary_WB',
            tools: [
              {
                id: 119,
                type: 'none',
                original: '2.5.2b S4YE Baseline Report 2015_Summary_WB.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A26%3A03.754Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Formalising alliances with target groups and mobilising partners',
    stageNumber: 3,
    sections: [
      {
        id: 1,
        title: 'Marketing and communication',
        description:
          'In Phase 3 you prepare the implementation of your YEE project, which is key for the success of the next phases. This requires building commitment with your target group and other partners through well-defined selection criteria, an outreach strategy aimed at the right target group, and clear communication about the project to all interested parties.',
        image: stage3,
        content: {
          mainContent: `Start by establishing contact with your target group. You can use social networks and other communication technologies to reach the right people. A greater investment of time for this initial phase saves time in later phases. Develop materials to communicate clearly what the project is about. Young people can only make an informed decision when committing to the project when they know what training and support is offered, how long each phase will last and what is required from those who enter. This includes being clear about the criteria you will use to select project participants. \n
          Main issues in the call for youth are: \n
          •	Involving different parties: collaborate with state institutions, local governments, TVET centres, companies, community-based and farmers’ organisations. Also local and national media can help to promote the project in the community. All these parties should be identified in the actor mapping you did in Phase 1. \n
          •	Involve community leaders to reach vulnerable youth who are no longer in the school system, people with disabilities, young mothers, and others who may face obstacles in seeking and finding employment without specific help. Develop a meeting schedule with male and female leaders in the targeted area. \n
          •	Develop presentation material especially focused on these vulnerable groups with adapted language and using communication media that reach those specific groups (e.g. radio). This may mean that information has to be developed in local indigenous languages, specifically if you want to target indigenous women who are more likely to speak only their own language. 
          •	Use different type of media: make use of local and mass media such as radio, social networks, press and the web; design and disseminate promotion materials such as banners, posters, flyers, brochures. \n
          •	Reach out to mothers, fathers and partners of your target group, so they can understand the benefits of the project and commit to supporting the participants. Identify champions who can help promoting the project to other parents or peers. \n
          Special attention should be paid to communicating how your project can specifically serve young women and girls, how it can break gender stereotypes and contribute to the transformation of gender relations at work. Similar attention should be given to the LGBT+ community, people with a disability, indigenous or other marginalized groups.`,
          subContents: [
            `Involve actors of various levels : Actively involve state actors that work with a population similar to that of the project, local governments, companies in the area, community-based organizations and peasant organizations, in order to facilitate the dissemination and call, as well as with local and national media, to publicize the project and its scope to the community. All of these stakeholders should be identified in the Stage 1 stakeholder mapping.`,
            `Involve community leaders to reach vulnerable young people who are no longer in the school system, people with disabilities, young mothers, and others who may face obstacles in seeking and finding employment without specific help. It is recommended to develop a schedule of meetings with women and men leaders in the targeted area.`,
            `Develop presentation material especially focused on these vulnerable youth groups with adapted language and using communication media that reach those specific groups. This may mean that information has to be developed in local indigenous languages, as in several places there is still less use of Spanish by women.`,
            `Include in the call process,  activities and tools both in the field and through mass media , such as: design of advertising materials and pieces; use of media such as radio, social networks, press and the web; distribution of announcement materials such as banners, posters, flyers, brochures.`,
            `Convene the mothers, fathers and couples of young people so that they can understand the benefits of the project and commit to supporting the participants.

                        `,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '3.1.1 How To Note Issue 2_How To Design An SMS Outreach Strategy In Youth Employment Programs_WBG_2021',
            tools: [
              {
                id: 130,
                type: 'none',
                original:
                  '3.1.5 How To Note Issue 2_How To Design An SMS Outreach Strategy In Youth Employment Programs_WBG_2021.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A17.076Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Registration and selection of participants',
        description: `Registration and selection of participants must be well documented and communicated. You can use existing tools for recording basic information on each participant that can also serve as a baseline for monitoring and evaluating your project (see also Phase 9).`,
        content: {
          mainContent: `For the process of selecting participants the evaluation criteria and their respective weight should be defined and communicated to young people in advance. You can adjust these according to the specific situation in your project area and the goals you have established. For example, giving more weight to women, young mothers or fathers, youth with existing businesses, NEET youth, young people with a disability or of a certain ethnic origin. \n 
          
          The gender analysis you did in Phase 1 can demonstrate the need for affirmative actions, such as establishing higher participation quotas for young women or other disadvantaged groups in order to level existing inequalities. Make sure you reach out to these groups during this registration and selection phase. \n 
          
          Participation in the project implies commitment in terms of time and expenses. You can provide project information and the registration form to your target group beforehand so they can reflect and return it at another time. For youth with internet access, you can offer the registration form online to facilitate their registration. For young people without internet access or who do not speak the national language you might need to offer alternative registration options and work with local staff who speak the language. Once participants have been selected you can formalise the mutual commitment between them and your organisation by signing a service provider – recipient agreement. \n 

          The YES!ME is an innovative online tool developed by Plan International for the registration and monitoring of participants of YEE projects. It allows you to measure the impact of your YEE project and utilize these data for better future programming`,
          subContents: [
            `It is recommended to give the project information and the registration form to the young person so that they can reflect and return it at another time. Participation in the project implies commitment on the part of the beneficiaries (time and expenses) and therefore has to be well thought out. In this box you can find various vocational exams / tests to find out the careers compatible with the profile of each young person (see section 2.2).`,
            `In order to facilitate the registration of people interested in participating in the YEE project, it is recommended to offer the registration form online . In order not to exclude people without internet access, it is also necessary to have other registration systems. Likewise, it may be necessary to offer help with registration to certain groups, especially in the case of young people from ethnic groups who do not speak Spanish or Portuguese well enough.`,
            `It is important to formalize the mutual commitment between your organization and the participant . For this purpose, there are examples of agreements between providers and recipients of services in the framework of YEE projects.`,
          ],
        },
        image: stage3,
        tools: [
          {
            id: 1,
            shortTitle:
              '3.2.1 Demand Driven Training_Making Cents_Rockefeller Foundation_2017',
            tools: [
              {
                id: 131,
                type: 'none',
                original:
                  '3.2.3 Demand Driven Training_Making Cents_Rockefeller Foundation_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A20.969Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Youth retention strategies',
        description:
          'How to avoid youth from dropping out of the TVET process prematurely? This you can pre-empt by developing a youth retention strategy, including risk identification, monitoring youth and offering good accompaniment during the different phases of your project.',
        image: stage3,
        content: {
          mainContent: `There are many situations that can lead young people to desert from the project. You can use different strategies for the retention of youth. \n

          One of the main ways to prevent desertion is the accompaniment of project participants. Schedule periodic communication moments with the participants to perceive their impression of the project, identify their needs and possible challenges they face. Keep records of the conversations and agreements that result from this accompaniment. Involve also the family and other people related to participants. If the family is aware of the project, commitments and benefits for their family member, the retention rate goes up. It also helps to locate the vocational training in a central place between 3 to 4 communities to facilitate participation of young men and women, and at the same time avoid too many people with the same competencies saturating the local market. Likewise, constant monitoring of youth participation must be carried out (see also Phase 9). \n
          
          To better focus your retention strategies, you can do a gender-differentiated analysis to identify risks that affect young women and men differently. The following actions can help to improve participation of adolescent and young women in YEE projects: \n
          •	Involve and commit the young women’s families and partners in the sensitization process so that they provide the necessary support for her participation in the project. \n
          •	Organize focus groups with young women to understand the obstacles they face and define actions to facilitate their participation. \n
          •	Address the particular needs of young women with children, providing services like childcare, early stimulation and travel allowance.\n
          •	Choose spaces where there are already childcare and other services for mothers and their babies present. \n
          •	Organize activities in daylight hours and at a short distance from the community. Plan the time and frequency of trainings in such a way that young women with children can participate. \n
          •	Make sure safe transportation is available or provide training on transportation security measures. In case of events at other locations, rent transportation for participants. \n
          •	Incorporate life skills training on self-esteem, empowerment, gender equality, sexual and reproductive health, different masculinities and life projects. This will help young men and women to understand existing gender relations and strengthen their capacities to make decisions regarding their own life (see Phase 4). \n
          •	Offer psychosocial support. \n
          
          In areas of social violence, you can organize spaces for reflection among participants to understand the conditions of violence and identify ways to face these. Give special attention to gender-based violence. In violent areas you can take the following actions: \n
          •	Prepare and constantly update social violence and risk maps. \n
          •	Involve key parties in the project, like local governments, community-based organizations and local community leaders. \n
          •	Provide individual and group work to people who face situations of violence to bring them closer to the project, promote their leading role and facilitate their self-esteem (see also Phase 4). \n
          •	Bring the project services closer to the communities and offer places, schedules and means of transport that provide safe conditions, in which young people can move without suffering any physical or verbal aggression. \n
          •	Implement participatory methodologies to generate trust among participants and the social fabric.`,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTtitle: '3.3.1 Manual-Orientaciones-Retencion-Escolar',
            tools: [
              {
                id: 132,
                type: 'none',
                original: '3.3.2 Manual-Orientaciones-Retencion-Escolar-1.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A28.496Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '3.3.2 National Youth Employment Body Practice Guide_Brotherhood_2020',
            tools: [
              {
                id: 133,
                type: 'none',
                original:
                  '3.3.4-3.1.3 National Youth Employment Body Practice Guide_Brotherhood_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A35.099Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'Mobilisation of local actors',
        description: `The importance of mobilizing and allying with local actors that can be important partners for the YEE project is emphasized several times in this and previous phases.`,
        image: stage3,
        content: {
          mainContent: `It is important to have the support of the local government and the community, especially leaders and families. This may require gender sensitization work. Use the guides from the Tools section to promote reflection on the roles and stereotypes socially assigned to women and men in order to stimulate a culture-sensitive consensus on what must change to reach gender justice.`,
          subContents: [
            `Several basic techniques of moderation and participation for group processes can be used in group events with young people, but also with communities or other actors involved in promoting employment and entrepreneurship. The moderation of group events facilitates the equitable participation of those present and the search for consensus in order to reach agreements and operational conclusions.`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: '3.4.1 manual taller comunitarios con g├®nero',
            tools: [
              {
                id: 134,
                type: 'g',
                original:
                  '3.4.1 manual taller comunitarios con g├®nero - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A44.726Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '3.4.2 S4YE Brief Online Learning Models for Low Bandwidth Areas_WB_2021',
            tools: [
              {
                id: 135,
                type: 'none',
                original:
                  '3.4.3 S4YE Brief Online Learning Models for Low Bandwidth Areas_WB_2021.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A27%3A55.534Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: 'Examples and good practices',
        description:
          'In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.',
        image: stage3,
        content: {
          mainContent: `The documents in this section are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.`,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle: '3.5.1 Jo╠üvenes Construyendo Futuro brochure digital',
            tools: [
              {
                id: 136,
                type: 'none',
                original:
                  '3.5.2.1 Jo╠üvenes Construyendo Futuro brochure digital.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A01.316Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 137,
                type: 'none',
                original:
                  '3.5.2.2 Jo╠üvenes Construyendo Futuro brochure impreso.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A07.668Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 138,
                type: 'none',
                original: '3.5.2.3 Jo╠üvenes Construyendo Futuro INFO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A21.592Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Personal and professional skills ',
    stageNumber: 4,
    sections: [
      {
        id: 1,
        title: 'Personal skills',
        description:
          'The educational system has been focused on people “learning” topics organized by curricular blocks, which are required to obtain academic degrees for future job opportunities. However, so called “soft” or “life” skills are seldom developed in formal education, despite their importance for staying in jobs or making businesses successful.',
        image: stage4,
        content: {
          mainContent: `For youth to be successful in a job or business, it is key to develop personal skills such as self-knowledge, self-esteem, gender awareness, and knowledge of their rights (see next sections). So, when designing modules for your YEE project, don’t forget to include training on life skills to develop these capacities. You can include dynamic, practical and participatory tools. For example, by using innovative ICTs (information and communication technologies) such as TikTok, to appeal to the interests of youth.  \n
          Young people also have to learn to manage their emotions, which begins by recognizing them and reflecting on the behaviours that trigger them. They have to learn to manage stress and tension, reviewing their emotional state in situations of success and frustration. Developing this self-knowledge requires reflecting on elements that form their identity (including gender, age, ethnicity) and understanding their strengths and weaknesses. \n
          Self-awareness and emotion management are basic skills to strengthen self-esteem and improve performance in the workplace. One way for youth to develop their self-esteem is through introspection about their personal life and projection towards their career aspirations. Being successful in work life moreover requires that young people become aware of the different areas of participation, beyond workshops and meetings; have access to information on legislation, organizational models and operating structures; and that they understand that by working together they can achieve common goals in an organized way. \n
          A life skills curriculum can include the following: \n
          •	Intrapersonal skills \n
          •	Interpersonal skills\n
          •	Communication\n
          •	Financial literacy \n
          •	Critical thinking \n
          •	Sexual and reproductive health and rights \n
          •	Climate adaptation \n`,
          subContents: [
            `Young people also have to learn to manage their emotions , which begins with recognizing their emotions and reflecting on the behaviors that promote them. They have to learn to manage stress and tension, reviewing their emotional state in the face of situations of success and frustration.`,
            `The development of self - knowledge includes recognizing constitutive elements of their identity, identifying their strengths and weaknesses, reflecting on the presence of gender in the construction of identity, generating tools to strengthen their self-esteem and developing an adequate attitude towards personal hygiene. .`,
            `Self-awareness and emotion management are basic skills to strengthen self-esteem and improve performance in the workplace. One way that young people can work on developing their self-esteem is through introspection about their personal life and projection towards their career aspirations.`,
            `Being successful in working life requires that young people become aware of the different areas of participation, beyond workshops and meetings; that they have information on legislative aspects of participation, organizational models and operating structure; and that they understand that by working together they can achieve common goals in an organized way.`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: '4.1.1',
            tools: [
              {
                id: 139,
                type: 'none',
                original: '4.1.1 Modulo 1 Autoconocimiento - Plan.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A26.302Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '4.2.2 Modulo 2 Manejo de emociones Plan',
            tools: [
              {
                id: 140,
                type: 'none',
                original: '4.1.2 Modulo 2 Manejo de emociones Plan.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A30.603Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              "4.3.3 Materiales de genero formacion formadores instructores SNPP - SAPE'A",
            tools: [
              {
                id: 141,
                type: 'g',
                original:
                  "4.1.3.1 Materiales de genero formacion formadores instructores SNPP - SAPE'A - G.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A35.109Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 142,
                type: 'none',
                original: "4.1.3.2 Manual del Facilitador - SAPE'A.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A28%3A43.099Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 143,
                type: 'none',
                original: "4.1.3.3 Manual del Participante - SAPE'A.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A02.145Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Skills for gender transformation',
        description: `To achieve gender equality it is essential to challenge existing roles and stereotypes of power. Part of this process is helping young men and women to develop self-awareness and self-esteem by understanding their own gender identity and that of the people around them.`,
        content: {
          mainContent: `Gender equality can only be achieved if we recognise that young women, men and LGTB+ people face different obstacles in acquiring jobs, climbing up the career ladder or establish their own business. In many cases, women face greater barriers than men, both in their daily life and at work. Therefore, it is important to encourage boys and young men to engage in the redistribution of power in their personal lives and in public spheres. They can become advocates and catalysers of change for the achievement of gender equality and women’s rights. Plan International has the Champions of Change methodology to promote this. \n

          At the same time, it is necessary to work on the empowerment of girls and young women so that they too defend their rights and become agents of change. For this, they will have to know their rights; recognize their strengths and weaknesses; and develop their self-esteem so that they lose fear of speaking in public and begin to participate actively, solving problems and taking control over their own lives. In short, they have to learn to make decisions with autonomy and self-worth about aspects that affect their own life, and establish agency and power. \n
          
          Empowerment is also the foundation of leadership. Once young women have developed the personal skills to be leaders in their own lives, they can also acquire the skills to be leaders at work. For this they need to be able to create a vision, develop strategies to achieve it, seek potential allies, and communicate with others. \n
          
          Part of this process is that young people, especially women, know their rights; from sexual and reproductive health rights (SRHR), to human, citizen and specific youth and women rights. It involves reflecting on sexuality and sexual orientation, eliminating taboos and myths around the subject, and having access to information on sexually transmitted diseases and how to prevent them. It is therefore key that SRHR is included in the life skills curricula.`,
          subContents: [
            `Part of this process is that young people, especially women, recognize their sexual and reproductive rights (DDSSRR) , reflect on sexuality and sexual orientation, eliminating taboos and myths around the subject, and have information on diseases of the sexual transmission and its prevention.`,
          ],
        },
        image: stage4,
        tools: [
          {
            id: 1,
            shortTitle:
              '4.2.1 Fortaleciendo capacidades para la igualdad de g├®nero',
            tools: [
              {
                id: 144,
                type: 'g',
                original:
                  '4.2.1.1 Fortaleciendo capacidades para la igualdad de g├®nero - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A16.891Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 145,
                type: 'g',
                original: '4.2.1.2 Gu├¡a de facilitaci├│n - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A22.011Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '4.2.2 Champions of Change for Gender Equality and Girls Rights- Plan International',
            tools: [
              {
                id: 146,
                type: 'g',
                original:
                  'Champions of Change for Gender Equality and Girls Rights- Plan International - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A28.771Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 147,
                type: 'none',
                original: 'Champions of Change_Plan_2016.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A29%3A40.856Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '4.2.3 Guia practica empoderamiento de mujeres en el sector metal',
            tools: [
              {
                id: 148,
                type: 'g',
                original:
                  '4.2.3.2a Guia practica empoderamiento de mujeres en el sector metal - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A22.637Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 149,
                type: 'none',
                original:
                  '4.2.3.2b GUIA_PARA_EL_EMPODERAMIENTO_DE_LAS_MUJER.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A26.323Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 150,
                type: 'none',
                original:
                  '4.2.3.5-8.1.5 Gender divide skills development_ILO_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A30.419Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle:
              '4.2.4 Manual metodologico de escuela de liderazgo femenino-  CLAC Fair Trade',
            tools: [
              {
                id: 151,
                type: 'g',
                original:
                  '4.2.4.5 Manual metodologico de escuela de liderazgo femenino-  CLAC Fair Trade - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A37.386Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 152,
                type: 'g',
                original:
                  '4.2.4.6-4.2.2.4 Celebrating_changemakHERS_Citi Foundation_2019 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A30%3A57.255Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Life project and financial planning',
        description: `Once young men and women have strengthened their personal skills, they can formulate their life project with a vision for the future. This involves socio-occupational orientation, identification of personal interests, search for job and business opportunities, and making their own decision on choosing the appropriate vocational process.`,
        image: stage4,
        content: {
          mainContent: `Financial literacy training and planning are a key part of the life project. Through the formulation of a personal budget, financial management and time management, young people can establish an adequate balance at the personal, family and work level. \n
          Financial literacy training should include ways to access loans and credits or making cash purchases, but also the importance of having different types of insurance and saving to guarantee future personal and business actions. Young people often have a short-term vision, so it is necessary to address issues such as responsible spending and the importance of having financial reserves for investments or solving future problems on a personal level, at work or in their business. Like this they can become financially independent, which enables them to make decisions about their own life.`,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '4.3.1 Rutas de Vida_Manual acompan╠âamiento Orientacio╠ün Socio-ocupacional 2013',
            tools: [
              {
                id: 153,
                type: 'none',
                original:
                  '4.3.2 Rutas de Vida_Manual acompan╠âamiento Orientacio╠ün Socio-ocupacional 2013.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A12.013Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 154,
                type: 'none',
                original:
                  '4.3.2.1 Construir Futuros Orientacion socio-ocupacional R1_MinEduCol_nd.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A23.693Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 155,
                type: 'none',
                original:
                  '4.3.2.2 Construir Futuros Orientacion socio-ocupacional R2_MinEduCol_nd.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A29.431Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 156,
                type: 'none',
                original:
                  '4.3.2.3 Construir Futuros Orientacion socio-ocupacional R3_MinEduCol_nd.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A38.242Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 157,
                type: 'none',
                original:
                  '4.3.2.4 Construir Futuros Orientacion socio-ocupacional R4_MinEduCol_nd.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A45.065Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 158,
                type: 'none',
                original:
                  '4.3.2.5 Construir Futuros Orientacion socio-ocupacional R5_MinEduCol_nd.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A31%3A54.228Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '4.3.2 Onda emprendedora manejo del dinero',
            tools: [
              {
                id: 159,
                type: 'none',
                original: '4.3.3 Onda emprendedora manejo del dinero.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A07.341Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'Job skills',
        description: `Skills required for employment and entrepreneurship include communication, conflict management, creative thinking, problem solving, as well as understanding labour rights and duties.`,
        image: stage4,
        content: {
          mainContent: `Start by teaching young people the importance of good communication skills for the development of a productive work environment and identifying ways to deal with conflict. This requires acquiring skills to communicate assertively and constructively, promote environments of respect and tolerance, enhance leadership and teamwork, identify power dynamics in the work environment, and adequately handle conflicts and personal relationships in general. Much of the communication between people is not only transmitted with verbal language, but also nonverbal (gestures) and written. All these types of (body) language could potentially lead to conflicts or rather have a positive effect in different areas of life. \n

          Creative thinking and openness are key elements for a proper understanding of problems and situations that arise in daily life and to make decisions. The development of a business also requires an entrepreneurial spirit and specific psychosocial characteristics. When young entrepreneurs understand the dimension of their productive activity, the success factors and limitations of their own ventures, they can develop the skills that allow them to succeed in the market. \n
          
          Young people that enter into an employment relationship should know about rights and duties, benefits and requirements, the functioning of the social security system, codes of conduct, internal job regulations, (self) evaluation of work performance, safety and health at work. Both young entrepreneurs and employees can benefit by understanding labour and tax laws and rights in their country and the institutions that govern these issues. \n
          
          At the end of the life skills training, you can evaluate the training’s effect, assess the level of appropriation of skills, identify positive and critical points, and define possibilities for improvement. \n
          
          The YES! Digital Ecosystem is an innovative suite of digital tools designed by Plan International for marginalised youth to support them in the journey to economic empowerment. In the e-learning platform YES!Academy youth can find a variety of courses on life and soft skills, technical and vocational courses for ICT, retail and hospitality, entrepreneurship, alternative learning systems and pre-employment orientation. These courses are developed with private sector involvement and allow youth to develop their skills and increase their employability chances.`,
          subContents: [
            `The creative thinking and openness are key elements for a proper understanding of problems and situations that arise in daily life and to make the right decisions.

                        The development of an enterprise also requires an entrepreneurial spirit and specific psychosocial characteristics. Young entrepreneurs must understand the dimension of their productive activity, the success factors and limitations that arise in their own ventures, and develop the skills that allow them to project themselves in a sustained way in the market.

                        Young people also need to know about the labor and tax laws and rights of their country and the institutions that govern these issues. These are also important insights for contractual employment relationships . Young people must have knowledge about the elements that make up the individual work relationship. They have to know about rights and duties, benefits and requirements, the functioning of the social security system, codes of conduct and internal work regulations, evaluation and self-evaluation of work performance, safety and health at work.`,
            `At the end of the life skills training, the process must be evaluated in order to make a quality control of the training, identify the positive aspects and critical points, as well as the pending actions based on the improvement of the training. For the same purpose, it serves to assess the level of appropriation of knowledge in life skills.`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              "4.4.1 Ready For Work youth life skills curriculum - work preparedness - Trainer's Guide - Plan International",
            tools: [
              {
                id: 160,

                type: 'none',
                original:
                  "4.4.1 Ready For Work youth life skills curriculum - work preparedness - Trainer's Guide - Plan International.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A13.283Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 161,
                type: 'none',
                original: '4.4.1.2a Skills gap_WB_full.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A26.194Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 162,
                type: 'none',
                original: '4.4.1.2b Skills Gap_WB_summary.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A38.487Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '4.4.2 Modulo 3. Relaciones sociales - Plan',
            tools: [
              {
                id: 163,
                type: 'none',
                original: '4.4.2.1 Modulo 3. Relaciones sociales - Plan.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A45.456Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle: '4.4.3 Modulo 4. Pensamiento Creativo - Plan',
            tools: [
              {
                id: 164,
                type: 'none',
                original: '4.4.3 Modulo 4. Pensamiento Creativo - Plan.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A50.165Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: '4.4.4 Modulo 7. Espiritu emprendedor - Plan',
            tools: [
              {
                id: 165,
                type: 'none',
                original: '4.4.4 Modulo 7. Espiritu emprendedor - Plan.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A54.468Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle: '4.4.5',
            tools: [
              {
                id: 166,
                type: 'none',
                original: '4.4.5 Modulo 5. Relaciones Laborales - Plan.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A32%3A57.952Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: 'Coaching and mentoring',
        description: `An important element in the development of skills is accompanying young people through coaching and mentoring. Ideally, you begin with this in Phase 4 and continue guiding them during vocational and entrepreneurship training (Phases 5 and 6) and even during post-training time at their jobs or in their own companies (Phase 7).`,
        image: stage4,
        content: {
          mainContent: `There are different ways to provide coaching and mentoring and increase youth’s technical and entrepreneurship skills:\n
          1)	Guiding mechanisms among young women and men themselves. This is called peer review. Exchange experiences can be very helpful for individual students in their process of recognizing and facing challenges and solving practical problems in their personal lives or at work. This can include looking at gender issues in education and work, either in groups of the same gender or in mixed groups. \n  
          2)	Mentoring of students by their teachers. Effectiveness of this (and the next) modality can be increased by training educators in mentoring practices with a gender transformation approach. \n
          3)	Mentoring or coaching by supervisors from the companies where students do their internships or actual employment after graduation. When graduates opt for a career as entrepreneur, they can choose to continue the peer review or look for an external mentor (for example, staff from a business association). Small and medium-sized enterprises can also be involved in orientation programs. \n
          In the coaching and mentoring process, differences in gender and age inherently introduce the challenge to maintain a power balance. On the one hand, the idea is for male or female coaches and mentors to use their accumulated experience when accompanying the student who has less experience. On the other hand, students who receive guidance should be able to follow their own empowerment process, which allows them to take responsibility in making their own decisions. \n
          
          An imbalance of power in coaching and mentoring relationships can easily distort the results of these processes. That is why it is important to raise awareness and train coaches and mentors in handling aspects of power, gender and age during the given guidance. When selecting coaches and mentors, look at their gender sensitivity, but also at their gender identity, since the use of same gender coaches or mentors can generate trust among the students, specifically in the case of women. \n
          
          Another form of guidance is labour intermediation, which can be carried out by coaches or mentors, but also by other actors such as a public or private service provider. Intermediation may include the organization of job fairs, practical exchanges, the creation of a demand – supply database (e.g. young people seeking and companies offering employment), or establishing a direct contact between young people and employers. Intermediation becomes more important in times of transition (for example, from school to technical training, from TVET to first job, from one job to another, or when becoming a parent).`,
          subContents: [
            `The guidance and mentoring by supervisors are important instruments for vocational training and empowerment of individuals and post-graduate students during their practices and internships, as well as in the context of employment. In the event that post-graduates do not continue their career in a work context (salaried employment) and opt for a career as an entrepreneur, this mentoring option by the employing company does not exist, but they can choose to continue the Peer review among entrepreneurs as colleagues and / or mentoring by external tutors may be considered. In addition, small and medium-sized enterprises can be involved in orientation programs.`,
            `In the counseling and mentoring process, gender and age relationships inherently introduce a challenge of keeping a balance of power. On the one hand, taking advantage of the accumulated experience of female or male tutors / mentors is necessary to accompany the person with less experience. On the other hand, tutors / mentors must ensure that the person who receives their support, follows an empowerment process that allows them to assume responsibility in making their own decisions. An imbalance of power in mentoring and mentoring relationships can easily distort the results of these processes. That is why it is important to raise awareness and train tutors and mentors in handling aspects of power, gender and age, in the orientation and mentoring process (see also section 2.4).

                        In the selection of tutors / mentors, their sensitivity to gender issues must be taken into account , but also their gender itself, since the use of tutors / mentors (women) can generate trust among female students / interns / employers.`,
            `Another form of accompaniment is labor intermediation , which can be carried out by tutors or mentors, but also by other actors such as a public or private service. Intermediation may include the organization of job fairs or exchanges, the creation of a database on young people seeking employment and companies offering employment, or the direct establishment of contacts between young people and employers. Like mentoring and guidance, intermediation becomes more important in times of transition (for example, from school to technical training, from FTP to first job, from one job to another, but also at the time of having a job). son / daughter).`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: '4.5.1 Digital-Skills-Toolkit',
            tools: [
              {
                id: 167,
                type: 'none',
                original: 'Digital-Skills-Toolkit.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A01.848Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '4.5.2  Programa de Mentoria',
            tools: [
              {
                id: 168,
                type: 'none',
                original: '4.5.2.1 Programa de Mentoria.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A16.393Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 169,
                type: 'none',
                original:
                  '4.5.2.5 Guia Orientacion Socio-ocupacional_docentes_Bogota_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A20.425Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 170,
                type: 'none',
                original:
                  '4.5.2.6 Secuencia Didactica Orientacion Socio-ocupacional_docentes_Min Edu Col_Dic 2015.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A26.638Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '4.5.3 Engaging employers in Apprenticeships opportunities - OECD',
            tools: [
              {
                id: 171,
                type: 'p',
                original:
                  '4.5.3.1 Engaging employers in Apprenticeships opportunities - OECD - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A32.988Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 172,
                type: 'p',
                original:
                  '4.5.3.2 Toolbox for Apprenticeship Coaches- Increase Apprenticeships in SMEs - AC4SME - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A38.520Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: '4.5.4 Enfoque de genero TUI Academy - G & P',
            tools: [
              {
                id: 173,
                type: 'gp',
                original: '4.5.4.1 Enfoque de genero TUI Academy - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A44.692Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 174,
                type: 'g',
                original:
                  '4.5.4.2 Handbook for Youth Workers-Gender-LGBTIQ-2016-EU - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A48.398Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle:
              '4.5.5 Handbook of ICT practices for guidance and career development',
            tools: [
              {
                id: 175,
                type: 'none',
                original:
                  '4.5.5.1 Handbook of ICT practices for guidance and career development.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A53.067Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 176,
                type: 'p',
                original:
                  '4.5.5.3 Skills needs anticipation assessments and approaches - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A03.824Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 177,
                type: 'g',
                original:
                  '4.5.5.4--5.6.2.3 Empowering rural women through ICT in TVET_UNESCO_2017 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A09.662Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: 'Examples and good practices',
        description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.`,
        image: stage4,
        content: {
          mainContent: `The documents are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.`,
          subContents: [],
        },
        tools: [],
      },
    ],
  },

  {
    id: 5,
    title: 'Educating for employability',
    stageNumber: 5,
    sections: [
      {
        id: 1,
        title: 'Recruiting and training TVET teachers',
        description: `The key objective of technical education and vocational training is to equip young people with skills relevant to the labour market and prepare them for salaried employment. In this phase, there are 6 key steps that must be followed to develop good quality and relevant technical and / or vocational education for young men and women.`,
        image: stage5,
        content: {
          mainContent: `To guarantee that TVET will produce the desired results, you need to select and recruit the right teachers with the right mindset to deliver gender transformative training in the classroom. This starts with human resource policies that promote a gender balance in teaching staff and management. As a second step you can train TVET teachers on youth empowerment and education with a gender transformative approach. This should include a focus on generating sensitive behaviour and equal treatment of teachers in the classroom towards male and female students as well as to people from ethnic, religious, LGBT+ or other minority groups.`,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle: '5.1.1 Thematic brief gender, education and training',
            tools: [
              {
                id: 178,
                type: 'g',
                original:
                  '5.1.2.6 Thematic brief gender, education and training - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A15.314Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 179,
                type: 'none',
                original:
                  '5.1.2.7 Rights@work 4 youth_facilitator guide_ILO_2016.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A20.238Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Apprenticeships and other work placements',
        description: `A basic element of technical and vocational education and training is exposing students to the reality of work. A variety of models exist for combining learning and work, the most common being internships and apprenticeships. `,
        image: stage5,
        content: {
          mainContent: `Choosing the type of work-integrated learning depends on various factors, including the national context, qualification frameworks, economic sectors and the level of formality of the labour market. There are forms of TVET that happen almost completely at the workplace. In this case, the educators are not teachers but managers and other employees in the company. In the case of these so-called apprenticeships, TVET institutes and the Ministry of Education are involved in quality control of the training and its certification but not, or very modestly, in classroom education. \n
          For the realization of effective work placements, you will need to prepare and instruct not only the student but also the employer. This should include gender awareness training to pre-empt the influence of age and gender within supervisor-trainee relationships. There should also be clarity on how to report potential cases of gender violence in an accessible and safe way, as risks of violence increase when there are highly unequal power relations. \n
          Want to know what a company is doing to advance gender equality? Use the Women’s Empowerment Principles Gender Gap Analysis Tool to identify strengths and areas where further action can be taken.`,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              "5.2.1 Outils pour des Apprentissages de Qualite_Vol 2_Guide de l'OIT a l'intention des praticiens_2020",
            tools: [
              {
                id: 180,
                type: 'none',
                original:
                  "5.2.0 - 5.3.0 - Outils pour des Apprentissages de Qualite_Vol 2_Guide de l'OIT a l'intention des praticiens_2020.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A32.404Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 181,
                type: 'none',
                original:
                  '5.2.0 - 5.3.0 ILO Toolkit for Quality Apprenticeships_Vol2_Guide for practitioners_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A43.877Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 182,
                type: 'none',
                original:
                  '5.2.0 Quality Apprenticeship Toolkit for LAC_ILO_2019.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A57.603Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '5.2.2 A step-by-step guide to promote quality apprenticeships',
            tools: [
              {
                id: 183,
                type: 'p',
                original:
                  '5.2.1.1 ILO  A step-by-step guide to promote quality apprenticeships - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A02.520Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 184,
                type: 'p',
                original:
                  '5.2.1.2 ILO Manual de herramiento (OIT) para los aprendizajes de calidad - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A09.076Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle: '5.2.3 Promoting adult learning in the workplace',
            tools: [
              {
                id: 185,
                type: 'none',
                original:
                  '5.2.2.3 Promoting adult learning in the workplace.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A15.307Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 186,
                type: 'none',
                original:
                  '5.2.2.4 Decent work for women_into_the_light_Plan_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A21.574Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: '5.2.4  Long-term apprenticeship model appraisal',
            tools: [
              {
                id: 187,
                type: 'none',
                original:
                  '5.2.4.3 Long-term apprenticeship model appraisal.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A34.274Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 188,
                type: 'none',
                original: '5.2.4.5 Cashing_In_Business_Case_Summary_Report.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A37.922Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle:
              '5.2.5 Brief_Transportation Costs and Youth Employment_WB_2018',
            tools: [
              {
                id: 189,
                type: 'none',
                original:
                  'S4YE Brief_Transportation Costs and Youth Employment_WB_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A51.073Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: `Evaluating students, curricula and work placements `,
        description: `Measuring the success and quality of TVET processes requires not only the examination of students’ performances, but also youth’s and employers’ satisfaction with the curricula and work placement. `,
        image: stage5,
        content: {
          mainContent: `TVET student examination must follow formal grading and certification frameworks of the country. In addition to assessing students’ performance in the formal curriculum, an increasingly important aspect in this examination is evaluating their skills and behaviour at the workplace. 

          There is a wide range of methodologies for managing and evaluating students’ competencies. These include evaluation of young people’s behaviour and gender awareness to ensure that the learning processes and internships not only strengthen technical and professional skills, but also life skills and transformation of gender relations at work.
          
          At the same time, it is important to ask students about their satisfaction with the curricular offer, the performance of their teachers and their mentors during the training process. When measuring satisfaction, don’t forget to disaggregate data for men and women, since they most likely will have different opinions and satisfaction levels. 
          
          Last but not least, you should evaluate the satisfaction of employers with the curricular offer and the performance of students in their internships, to understand the relevance and quality of their skills for job placement. The measurement of employer satisfaction should also include gender aspects and assess whether the awareness and behaviour of employers regarding gender relationships and stereotypes have changed.`,
          subContents: [
            `Examination of students is not sufficient to measure the success and quality of the professional technical learning process. It is also important to carry out evaluations of satisfaction from the perspective of students with the curricular offer, the performance of their teachers and the management of the training process. In measuring satisfaction, it is important to disaggregate data for men and women, since it is very likely that there is considerable variety in opinions and satisfaction between`,
            `Last but not least, it is necessary to evaluate the satisfaction of employers with the curricular offer and the performance of students in their internships and the relevance and quality of their skills for job placement. The measurement of employer satisfaction should also include gender aspects and measure whether in practice the awareness and behavior of employers regarding gender relationships and stereotypes have changed.`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '5.3.1 Encuestas a empleadores sobre graduados de educacion que contratan',
            tools: [
              {
                id: 190,
                type: 'p',
                original:
                  '5.3.3.1 Encuestas a empleadores sobre graduados de educacion que contratan - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A55.006Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '5.3.2 Guide to International Labour Standards and Rights Young People_ILO_Dec 2017',
            tools: [
              {
                id: 191,
                type: 'none',
                original:
                  '5.3.4 Guide to International Labour Standards and Rights Young People_ILO_Dec 2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A35%3A59.677Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'Preparing to enter the labour market',
        description: `The next step is students preparing to apply for a job. Training and accompanying students in preparing their Curriculum Vitae and application letters are essential to improve the success rate of obtaining jobs. They can practice with this process when applying for an internship.`,
        image: stage5,
        content: {
          mainContent: `Knowing yourself and knowing how to formulate and present yourself technical and, perhaps even more important, life skills in a clear and forceful way, is key when applying for a job or preparing a job interview. For the majority of candidates job interviews produce a lot of stress, which can be reduced by preparing well. Various guidelines exist for the preparation of job interviews, including thorough revision of available information on the job profile and practicing beforehand with someone else. Job readiness and pre-employment orientation trainings are a good way to support the youth in their transition to formal employment. Plan International’s chatbot Training and Employment Support Services Assistant (TESSA) helps youth to identify their skills, build a curriculum vitae, find training and decent work through Facebook Messenger.

          Once the person is inserted into work life, performance interviews will be a regular practice. These interviews can be very frequent at the beginning, specifically during the probationary period, and eventually reduce to once a year. In all cases, a good preparation of these performance interviews remains important. There are some relevant tools for this purpose.
          
          Even while having a job, career planning and continuous education remain important for personal development, improve professional performance and enrich future job prospects.`,
          subContents: [
            `Guidance and tutoring are not limited to school time, but can also extend to the time prior to entering the vocational technical training institution (FTP) and to post-training time at work or in one's own company. For this reason, we have included the guidance and mentoring in the Life Skills Stage (section 4.5) as well as the tools.`,
          ],
        },
        tools: [],
      },
      {
        id: 5,
        title: 'Labour mediation services ',
        description: `More and more TVET centres include mediation services for their students and the private sector in their offer.`,
        image: stage5,
        content: {
          mainContent: `Labour mediation services for companies include services to find suitable, well-prepared staff for open job positions. These can be full-time, part-time, permanent, temporary or flexible labour contracts. One aspect of these services is the application of non-discrimination mechanisms at work and ensuring that men and women have equal opportunities to find work with equitable payments. In some cases, affirmative actions (positive discrimination) can also be considered to break historic barriers and improve access to work for women, LGBT+, ethnic groups, people with disabilities or youth. 

          Labour mediation also includes services for students and graduates, for example by managing a job database, offering legal support or informing on matters such as insurance and social benefits.`,
          subContents: [
            `Career planning and continuing education are other important aspects of job placement and these require a proactive attitude from people to improve their professional and work performance, and improve their future job prospects.`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle: '5.5.1 Processo seletiva - dicas aos jovens.pdf',
            tools: [
              {
                id: 192,
                type: 'none',
                original: '5.5.2.2 Processo seletiva - dicas aos jovens.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A04.184Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: 'Examples and good practices',
        description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.`,
        image: stage5,
        content: {
          mainContent: '',
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '5.7.1 Apprenticeship schemes in European countries A cross-nation overview',
            tools: [
              {
                id: 197,
                type: 'p',
                original:
                  '5.7.1.0 Apprenticeship schemes in European countries A cross-nation overview - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A41.881Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 198,
                type: 'p',
                original:
                  '5.7.1.2 Apprenticeship Framework Analysis Europe - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A45.770Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 199,
                type: 'none',
                original:
                  '5.7.1.3 Analysis and overview of NQF level descriptors in European countries.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A53.554Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 200,
                type: 'p',
                original:
                  '5.7.1.5 Labour market impact of National Qualification Frameworks in six countries - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A36%3A58.676Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 201,
                type: 'none',
                original:
                  '5.7.1.6 Towards Competence-Based Technical-Vocational Education and Training in Ethiopia.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A37%3A02.978Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 202,
                type: 'none',
                original: "5.7.1.9 Manual del Facilitador - SAPE'A.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A37%3A07.895Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: "5.7.2 Manual del Participante - SAPE'A",
            tools: [
              {
                id: 203,
                type: 'none',
                original: "5.7.2.0 Manual del Participante - SAPE'A.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A39%3A07.872Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 204,
                type: 'gp',
                original:
                  '5.7.2.4 Women in the Workplace 2017 - Mc Kinsey - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A39%3A39.797Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 205,
                type: 'gp',
                original:
                  '5.7.2.5 Breaking with gender stereotyping in a tuna factory in Solomon Islands - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A40%3A10.044Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 206,
                type: 'p',
                original:
                  '5.7.2.6 bridging the gap - the role of private sector in TVET and employment creation - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A40%3A32.928Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '5.7.3 Educaci├│n T├®cnico Profesional y Equidad de G├®nero en Chile',
            tools: [
              {
                id: 207,
                type: 'g',
                original:
                  '5.7.3 Educaci├│n T├®cnico Profesional y Equidad de G├®nero en Chile - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A41%3A14.384Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: '5.7.4 manual lenguaje no sexista en la administracion',
            tools: [
              {
                id: 208,
                type: 'g',
                original:
                  '5.7.6 manual lenguaje no sexista en la administracion - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A41%3A40.834Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle:
              '5.7.5 Strategies_for_Enhancing_Females_Participation_in_Nigeria',
            tools: [
              {
                id: 209,
                type: 'g',
                original:
                  '5.7.8 Strategies_for_Enhancing_Females_Participation_in_Nigeria - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A10.593Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 6,
    title: 'Preparing for entrepreneurship ',
    stageNumber: 6,
    sections: [
      {
        id: 1,
        title: 'Incubation and entrepreneurship centres',
        description:
          'Based on the market scan conducted in Phase 1, apart from employment opportunities, it is important to help young people develop the relevant skills to face challenges of establishing and managing their own businesses.',
        image: stage6,
        content: {
          mainContent: `Not everybody wants to work for a boss with a fixed salary. Some people have a more entrepreneurial character and dream of running their own company. Others live in areas where the socio-economic situation makes that salaried employment is simply not available or not enough to make a living. 

          Moreover, employment is increasingly temporary and flexible, which is why it is sometimes necessary to focus on starting a business or a combination of both. It is possible, in different periods of someone’s working life, to follow both options. There are also people who combine a salaried job with their own company. 
          
          A relatively recent trend in TVET institutes is the establishment of departments or centres for entrepreneurial development and the incubation of businesses. Other actors (sometimes groups of young people themselves) have established spaces for co-creation in which different entrepreneurs work together and exchange their experiences. 
          
          For young people to feel empowered and effectively take the step to enter the business arena, they need a supportive environment, in which there is room to experiment and innovate; even to fail and restart. You can stimulate this by holding a business plans competitions whose winners receive start-up capital and advisory services. Specific awards can be given to the best business plans presented by women, to promote female entrepreneurship.
          `,
          subContents: [
            `A relatively recent trend in technical-vocational training institutes is the establishment of departments or centers for entrepreneurial development and the incubation of companies . Other institutions (and sometimes groups of young people themselves) have established spaces for co-creation in which different entrepreneurs work together and exchange their experiences.`,
            `A supportive environment for students and recent graduates is very important, in which there is room to experiment and innovate, and in which there is still room to fail and restart, allowing young people to effectively take the step. important to enter the business area and conquer the market.`,
            `A specific instrument frequently used is the holding of business plan development contests and the provision of special prizes for winners of these contests. Generating the opportunity for awards aimed especially at women with better business plans.`,
            `In addition to the aforementioned, the entrepreneurial development centers must include an offer of support and specific accompaniment for women in order to ensure that they can enter the business area and the labor market well prepared and empowered.`,
          ],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '6.1.1 Erasmus for Young Entrepreneurs-Manual for Intermediary Organisations_EU_2017',
            tools: [
              {
                id: 210,
                type: 'none',
                original:
                  '6.1.1.10 Erasmus for Young Entrepreneurs-Manual for Intermediary Organisations_EU_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A14.894Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 211,
                type: 'none',
                original: '6.1.1.6 entrepreneurial_learning_guide_en.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A20.630Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 212,
                type: 'none',
                original:
                  '6.1.1.7-6.7.2.5 How to facilitate Social Business Incubation Youth_EU_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A25.785Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 213,
                type: 'none',
                original:
                  '6.1.1.8 Role of Business Incubators on Youth Emploment Tanzania_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A32.308Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 214,
                type: 'none',
                original:
                  '6.1.1.9 Role Business Incubators Youth Entrepreneurship Kenia_Academic_2016.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A38.962Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '6.1.2 Tu Plan de Negocios paso a paso',
            tools: [
              {
                id: 215,
                type: 'none',
                original: '6.1.2.5 Tu Plan de Negocios paso a paso.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A44.578Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Business development',
        description:
          'When offering business development training, you need to include a variety of components. In this section you can find guidance and tools related to the basic steps to establish, develop and consolidate companies.',
        image: stage6,
        content: {
          mainContent: `
          Main topics for market-oriented business development curricula are:
  Carrying out market research
	Business plan development
	Requirements to register and establish a company
	Marketing and sales
	Human resources management
	Financial management
	Customer satisfaction
	Leadership

Gender inequalities continue to limit the contribution of women to their communities through entrepreneurship. While all entrepreneurs face significant challenges, women entrepreneurs face higher structural barriers as a result of discriminatory gender norms, high burden of unpaid care, less access to productive assets, fewer opportunities to develop relevant skills, restrictions on access to financing, lack of business networks and mentors, as well as gender-blind policies, laws and regulations. These barriers jeopardise women’s ability to start and grow companies and therefore limit their ability to act as agents of change in their communities. Business development centres should offer specific support and accompaniment for women to overcome additional barriers they face and ensure they can enter the business and labour market well prepared and empowered.

Plan International has developed EntrepreNerd 2.0 which is a simulation game through which players are equipped, step by step, with the necessary skills to set up a small business. The journey will go through 10 critical topics in doing business: 
1.	Planning
2.	Market research
3.	Advertising and promotions
4.	Decision-making
5.	Negotiation
6.	Investment
7.	Finding a niche market
8.	Communication skills
9.	Business ethics

In the e-learning platform of Plan International YES!Academy you can find a variety of courses to follow while supporting youth in YEE projects, including on life and soft skills, retail, hospitality and entrepreneurship courses. `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle: '6.2.1 50 tips para iniciar tu propio negocio',
            tools: [
              {
                id: 216,
                type: 'none',
                original: '6.2.1.2 50 tips para iniciar tu propio negocio.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A42%3A58.525Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 217,
                type: 'none',
                original:
                  '6.2.1.3 Supporting-young-entrepreneurs-what-works.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A13.477Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 218,
                type: 'none',
                original:
                  '6.2.1.4 Gender gap youth self-employment_Ethiopia_IDRC_2016.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A21.261Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 219,
                type: 'none',
                original: '6.2.1.5 Start your business manual_ILO_2015.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A28.228Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 220,
                type: 'none',
                original:
                  '6.2.11 S4YE Digital Solutions for Youth Agripreneurship_WB_2021.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A39.902Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '6.2.2 S4YE Knowledge Brief 9 - E-commerce and Women-led SMEs in MENA_WB_2019',
            tools: [
              {
                id: 221,
                type: 'g',
                original:
                  '6.2.7.10 S4YE Knowledge Brief 9 - E-commerce and Women-led SMEs in MENA_WB_2019 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A45.521Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 222,
                type: 'g',
                original:
                  '6.2.7.8 Development of Female Entrepreneurship_promising practice_UNESCO_2020 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A53.691Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 223,
                type: 'none',
                original:
                  '6.2.7.9 Gender barriers report Entrepreneurship and Leadership_UNICEF_2021.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A43%3A57.929Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Collective versus individual companies',
        description: `Different models of collective and individual companies can be compared in order to make an informed decision regarding what type of business to establish in specific sectors and markets.`,
        image: stage6,
        content: {
          mainContent: `The amount of human and financial resources required to start a company can be a reason to do this together with others. There are different legal forms for these collective companies, the most common are the Association and Cooperative. 
          Apart from sharing business-related risks, teamwork and the use of complementary skills to establish and develop a business can also work as a catalyser for empowerment. These joint work mechanisms can also be a specific stimulus for women to enter the business world and conquer the market.
          In your YEE project, present the different alternatives youth have and discuss about advantages and challenges of each alternative. The choice from one alternative or another will depend on issues such as personal preferences (some prefer to work alone, others in teams) or the maturity level of the business. Also, complementarity of services or products offered by different entrepreneurs can `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '6.3.1 C-BED_Orientation to Entrepreneurship Package_ILO',
            tools: [
              {
                id: 224,
                type: 'none',
                original:
                  '6.3.1.10 C-BED_Orientation to Entrepreneurship Package_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A13.292Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 225,
                type: 'none',
                original:
                  '6.3.1.11a C-BED_Aspiring Entrepreneurs_Learning_Module_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A18.615Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 226,
                type: 'none',
                original:
                  '6.3.1.11b C-BED_AE_Learning_Module_-_Session_2.5_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A23.361Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 227,
                type: 'none',
                original:
                  '6.3.1.12 C-BED_Innovation_for_Problem_Solving_and_Entrepreneurship_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A26.856Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 228,
                type: 'none',
                original: '6.3.1.13 C-BED_SBO_Learning_Module_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A32.382Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 229,
                type: 'none',
                original:
                  '6.3.1.14 - 6.2.5.3 C-BED_Basic_Financial_Literacy_Learning_Module_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A37.254Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 230,
                type: 'none',
                original:
                  '6.3.1.15 C-BED_Business_Plan_Development_Tool_ILO_2014.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A42.378Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 231,
                type: 'none',
                original:
                  '6.3.1.16 C-BED_Learning_Module_for_Livelihoods_Resilience_and_Social_Protection_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A47.293Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '6.3.2 C-BED_AE_Learning_Module_Gender_Emphasis_ILO_2013',
            tools: [
              {
                id: 232,
                type: 'none',
                original:
                  '6.3.2.7 C-BED_AE_Learning_Module_Gender_Emphasis_ILO_2013.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A52.146Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 233,
                type: 'none',
                original:
                  '6.3.2.8 C-BED_SBO_Learners_Module_Gender_Emphasis_ILO_2013.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A44%3A56.920Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'Supply and value chain development ',
        description:
          'When young people set up their own business, they should take into account that they will not operate in a vacuum but will be strongly linked to other companies in the sector in which they operate. ',
        image: stage6,
        content: {
          mainContent: `There are a variety of models and methodologies to analyse the supply and value chains of which youth’s business are part and to understand the positioning of their company in that chain. Once their role and position in the chain is clear, this can be strengthened and consolidated.  Women’s work is often carried out in the least valued parts of a value chain, e.g. as
          home-based or informal workers. Women tend to be underpaid and their (informal) jobs are less secure. In agricultural settings, women are often not visible, while they carry out a large part of the agricultural activities. Women-owned rural businesses tend to face more constraints and receive fewer services and support than those owned by men. Therefore, it is important to identify specific possibilities to strengthen the position of women in the management and development of value or supply chains.`,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '6.4.1 Do agricultural development projects reach, benefit or empower women',
            tools: [
              {
                id: 234,
                type: 'g',
                original:
                  '6.4.1.2 Do agricultural development projects reach, benefit or empower women - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A02.283Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 235,
                type: 'g',
                original:
                  '6.4.1.4 Toolbox Promoting equal participation in sustainable economic development - GIZ - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A09.005Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '6.4.2 Extracting Equality - Gender equality in extractive industries guidelines',
            tools: [
              {
                id: 236,
                type: 'gp',
                original:
                  '6.4.2.1 Extracting Equality - Gender equality in extractive industries guidelines - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A16.379Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 237,
                type: 'gp',
                original:
                  '6.4.2.2 The power of procurement - How to source from women-owned businesses - UN Women - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A20.784Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 238,
                type: 'gp',
                original:
                  '6.4.2.3 Women in Agribusiness Report - IFC - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A24.983Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: `Financial management`,
        description: `A key aspect for successful entrepreneurship and business development is access to capital and good financial management.`,
        image: stage6,
        content: {
          mainContent: `A first step in financial management is to identify the possibilities and mechanisms to obtain access to seed capital and credit to start a company. This is specifically relevant for young people starting their first entrepreneurial experience. Subsequently there is a need for credit to grow the business and to finance recurring costs (such as to hold stocks or buy agricultural inputs). This requires the ability to prepare loan applications at banks and microfinance institutions. Once financing has been received, good record keeping of income and expenses is key to make sure the loan will be repaid on time and to avoid an accumulation of the loan costs (e.g. interest payments).

          According to various studies, women are generally more efficient and reliable in managing investments, loans and paying their debts. This may be a reason to focus on preparing women in the financial aspects of business management, as the effect on the sustainability and profitability of businesses can be very strong. At the same time, one must not forget to train men in financial matters to enable them to acquire the necessary financial management skills as well.
          
          When making investments in the company, both men and women need to understand the concept of depreciation (i.e. equipment losing its value over time) and be able to apply it in their financial management to ensure the renewal of these investments at the appropriate times.          
                    `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle: '4.5.1 Digital-Skills-Toolkit',
            tools: [
              {
                id: 167,
                type: 'none',
                original: 'Digital-Skills-Toolkit.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A01.848Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '4.5.2  Programa de Mentoria',
            tools: [
              {
                id: 168,
                type: 'none',
                original: '4.5.2.1 Programa de Mentoria.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A16.393Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 169,
                type: 'none',
                original:
                  '4.5.2.5 Guia Orientacion Socio-ocupacional_docentes_Bogota_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A20.425Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 170,
                type: 'none',
                original:
                  '4.5.2.6 Secuencia Didactica Orientacion Socio-ocupacional_docentes_Min Edu Col_Dic 2015.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A26.638Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '4.5.3 Engaging employers in Apprenticeships opportunities - OECD',
            tools: [
              {
                id: 171,
                type: 'p',
                original:
                  '4.5.3.1 Engaging employers in Apprenticeships opportunities - OECD - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A32.988Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 172,
                type: 'p',
                original:
                  '4.5.3.2 Toolbox for Apprenticeship Coaches- Increase Apprenticeships in SMEs - AC4SME - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A38.520Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: '4.5.4 Enfoque de genero TUI Academy - G & P',
            tools: [
              {
                id: 173,
                type: 'gp',
                original: '4.5.4.1 Enfoque de genero TUI Academy - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A44.692Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 174,
                type: 'g',
                original:
                  '4.5.4.2 Handbook for Youth Workers-Gender-LGBTIQ-2016-EU - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A48.398Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle:
              '4.5.5 Handbook of ICT practices for guidance and career development',
            tools: [
              {
                id: 175,
                type: 'none',
                original:
                  '4.5.5.1 Handbook of ICT practices for guidance and career development.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A33%3A53.067Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 176,
                type: 'p',
                original:
                  '4.5.5.3 Skills needs anticipation assessments and approaches - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A03.824Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 177,
                type: 'g',
                original:
                  '4.5.5.4--5.6.2.3 Empowering rural women through ICT in TVET_UNESCO_2017 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A34%3A09.662Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: 'CSR and Social Enterprises',
        description: `A relatively recent and very important trend in socio-economic development worldwide is Corporate Social Responsibility (CSR). This trend is related to a growing concern of civil society, the business world and governments to respect human rights at work and take better care of the environment to combat climate change and biodiversity degradation. `,
        image: stage6,
        content: {
          mainContent: `More and more companies are introducing CSR policies and practices into their businesses. It is important to know and understand these when entering the private sector. As an entrepreneur you need to respect rights, social and environmental obligations. Also as a worker you need to know your rights, especially women whose rights are less respected and who face discrimination of different types such as lower salaries or no access to male-dominated sectors (e.g. construction, automotive). 

          Although CSR may involve an additional cost on the short term, on the long term it brings not only social and environmental benefits for society, but also benefits for the company in the form of satisfied clients, a well-trained and committed staff, better profitability and, thus, economic sustainability.
          
          In the last years, the number of social enterprises has grown considerably. These are businesses with a social or environmental mission, whose profit also benefits society. Businesses established by young people are often a type of social enterprises and they also look for cooperation with others in co-working or co-creation spaces. Like this they can jointly develop innovative initiatives for raising awareness, advocacy and lobby on socially important topics. They can exchange new technologies and achieve economies of scales in their operations, thus creating big social impact with small investments. `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '6.6.1 Challenge-Fund-for-Youth-Employment-Uganda-Scoping-Report_2019',
            tools: [
              {
                id: 239,
                type: 'none',
                original:
                  '6.6 Challenge-Fund-for-Youth-Employment-Uganda-Scoping-Report_2019.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A45%3A54.077Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 240,
                type: 'none',
                original:
                  '6.6 Financial_management_practices_in_successful_Small.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A00.828Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 241,
                type: 'none',
                original: '6.6 Funding women entrepreneurs_EIB_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A04.926Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 242,
                type: 'none',
                original:
                  '6.6 LaGestionFInancieraylacompetitividadPYME_2017.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A18.648Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 243,
                type: 'none',
                original: '6.6 Manual Gestion financiera para PYMES.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A24.793Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '6.6.2 Invest in Women - IFC',
            tools: [
              {
                id: 244,
                type: 'g',
                original: '6.6.1.1 Invest in Women - IFC - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A33.396Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '6.6.3 Determinants for financial inclusion of youth entrepreneurs_PEP_2020',
            tools: [
              {
                id: 245,
                type: 'none',
                original:
                  '6.6.2.3 Determinants for financial inclusion of youth entrepreneurs_PEP_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A41.384Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 7,
        title: 'Examples and good practices',
        description:
          'In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.',
        image: stage6,
        content: {
          mainContent: `The documents are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.

                    `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '6.7.1 Impact CSR on Female Education Development in Rural NIgeria_2020',
            tools: [
              {
                id: 246,
                type: 'none',
                original:
                  '6.7.1.3 Impact CSR on Female Education Development in Rural NIgeria_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A46.915Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '6.7.2 Social-Entrepreneurship-and-youth employment-S4YE-WB_2018',
            tools: [
              {
                id: 247,
                type: 'none',
                original:
                  '6.7.2.6 Social-Entrepreneurship-and-youth employment-S4YE-WB_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A52.382Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 248,
                type: 'none',
                original:
                  '6.7.2.7 S4YE Knowledge Brief #5 Social Enterprise and Youth Employment_WB_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A46%3A56.747Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 8,
        title: 'Examples and good practices',
        description:
          'In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your YEE projects and initiatives.',
        image: stage6,
        content: {
          mainContent: `The documents are organized by the sections of this stage. We invite you to share your documents and good practice examples as well.

                    `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle: '6.8.1 Business Case El Salvador - Plan & Accenture',
            tools: [
              {
                id: 249,
                type: 'none',
                original:
                  '6.8.1.2 Business Case El Salvador - Plan & Accenture.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A01.870Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 250,
                type: 'g',
                original:
                  '6.8.1.3 Afrifresh Fresh produce gender mainstreaming in South Africa - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A07.398Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 251,
                type: 'gp',
                original:
                  '6.8.1.3 Driving Toward Equality - Women ride-hailing and the sharing economy - IFC & Accenture - G & P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A26.857Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 7,
    title: 'Sustainability among youth',
    stageNumber: 7,
    sections: [
      {
        id: 1,
        title: `Learning from work experiences and role models`,
        description: `The final goal of any YEE project is achieving economic empowerment among youth. When this is reached, the impact of your project will be sustainable.`,
        content: {
          mainContent: `YEE projects prepare young people for a career in employment or to follow the path of entrepreneurship. However, the responsibility of project implementing parties does not end with youth starting a job or enterprise. It is important to continue accompanying them for a considerable period of time to: 
          Support graduates during the start of their careers, for example through continued mentoring (see Phase 4). 
          Learn from work experiences to improve TVET curricula and the quality of learning techniques, models and methods for internship. 
          Measure the impact of the project in the medium and long term on youth and other parties (see Phase 8 and 9).
          With their experiences gained in the world of work, graduates can serve as role models for people who are still on the educational journey. The use of role models can be a very strong educational tool for young people. Role models can also be an important tool to break gender stereotypes at work. Women in leadership positions, in non-traditional jobs, or running their own business, can show that they have achieved success in their careers and this can inspire young women who are still studying to follow those examples with more self-confidence.
          `,
          subContents: [],
        },
        image: stage7,
        tools: [
          {
            id: 1,
            shortTitle:
              '7.1.1 Tracking vocational graduates in EU candidate countries',
            tools: [
              {
                id: 252,
                type: 'none',
                original:
                  '7.1.1. Tracking vocational graduates in EU candidate countries.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A42.936Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '7.1.2 Integrating core work skills into TVET systems- Six country case studies - ILO',
            tools: [
              {
                id: 253,
                type: 'none',
                original:
                  '7.1.2 Integrating core work skills into TVET systems- Six country case studies - ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A46.309Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Alumni networks and clubs',
        description: `An efficient and frequently used way to maintain contact with postgraduates is the establishment and maintenance of networks and alumni clubs.`,
        image: stage7,
        content: {
          mainContent: `In activities such as experience-sharing events, alliances can be created for graduates to continue learning from each other and sharing their experiences with students who are still in the graduation process. These continuous learning mechanisms can also include mentoring and peer review (see Phase 4) between graduates or with current students and teachers. Graduates can be a very useful source to identify possibilities for internships, apprenticeships and job opportunities for current students. Graduates can also be a source to identify new people and groups that can benefit from a YEE project. 

          Alumni networks or clubs can be organized by industry (transport, agriculture, maquila, etc.) or by sector (entrepreneurs or salaried persons in the private or public sector) to increase the relevance of the exchange. A specific focus should also be given to certain groups who face different barriers and subsequently have different experiences and needs, such as women, people with disabilities or from the LGBT+ community. 
          
          With the right management and maintenance mechanisms, alumni networks can sustain for long periods of time. As such they can become important instruments for providing accompaniment to graduates on the long term and to evaluate the true impact of your project after 10 years or even more.
          
          While YEE organizations and TVET institutes can offer spaces and physical instruments for alumni networks to carry out their activities, the management and coordination of the networks should be the responsibility of the alumni, preferably based on volunteerism.`,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '7.2.1 International Youth Foundation 2025-Strategy-Brochure_2020',
            tools: [
              {
                id: 254,
                type: 'none',
                original:
                  '7.2.1a International Youth Foundation 2025-Strategy-Brochure_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A47%3A53.301Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 255,
                type: 'none',
                original:
                  '7.2.1b International Youth Foundation_Transformation-2022_IYF-Strategy-SP.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A05.162Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 256,
                type: 'none',
                original:
                  '7.2.1c International Youth Foundation_Transformation-2022_IYF-Strategy-PO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A19.291Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 257,
                type: 'none',
                original:
                  '7.2.1d International Youth Foundation_Transformation-2022_IYF-Strategy-FR.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A32.068Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '7.2.2 How to Plan Successful Alumni Events for Greater Engagement',
            tools: [
              {
                id: 258,
                type: 'none',
                original:
                  '7.2.3 How to Plan Successful Alumni Events for Greater Engagement.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A48.266Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Expansion of networks and alliances',
        description:
          'Graduates can serve as a vehicle for expanding contacts and relationships with new companies and organizations.',
        image: stage7,
        content: {
          mainContent: `TVET institutes should constantly look for possibilities to expand their network and partnerships with companies, governmental institutions and civil organizations. These partnerships will help them to continuously update their curricula to market trends and 
          offer more opportunities for graduates in alliance with company demands.`,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '7.3.1 Social-capital-of-lses-students-using-student-stories-to-mobilise-student-success_2019',
            tools: [
              {
                id: 259,
                type: 'none',
                original:
                  '7.3.2 Social-capital-of-lses-students-using-student-stories-to-mobilise-student-success_2019.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A51.893Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: `Examples and good practices`,
        description:
          'In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.',
        image: stage7,
        content: {
          mainContent: '',
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '7.4.1 S4YE Private Sector Webinar - Facebook & AEO presentation_WB_2020',
            tools: [
              {
                id: 260,
                type: 'g',
                original:
                  '7.4.5 S4YE Private Sector Webinar - Facebook & AEO presentation_WB_2020 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A48%3A55.345Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 8,
    title: ' YEE project sustainability',
    stageNumber: 8,
    sections: [
      {
        id: 1,
        title: `Articulation with public policies`,
        description: `A pre-condition for the sustainability of YEE projects is the articulation with public entities and policies related to technical and vocational education and training. 

                `,
        content: {
          mainContent: `As soon as you start analysing the market and designing your project (see Phase 1 and 2), you should establish partnerships with governmental and private sector entities. By coordinating closely with public institutions that are related to TVET you can ensure that your project aligns with national policies and legislation. Like this you can achieve formal recognition of curricula and offer students nationally accepted certifications upon graduation. 
                    `,
          subContents: [],
        },
        image: stage8,
        tools: [
          {
            id: 1,
            shortTitle:
              '8.1.1 Educacion tecnico profesional en la politica publica-2014',
            tools: [
              {
                id: 262,
                type: 'none',
                original:
                  '8.1.1. Educacion tecnico profesional en la politica publica-2014.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A14.657Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '8.1.2 The role of TVET governance at sub-national levels',
            tools: [
              {
                id: 263,
                type: 'none',
                original:
                  '8.1.2 The role of TVET governance at sub-national levels.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A19.646Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle: '8.1.3 Gender in Entrepreneurship-EIGE-2016',
            tools: [
              {
                id: 264,
                type: 'none',
                original: '8.1.3 Gender in Entrepreneurship-EIGE-2016.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A24.020Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle: '8.1.4 National Strategic Framework Lebanon TVET_2018',
            tools: [
              {
                id: 265,
                type: 'none',
                original:
                  '8.1.6 National Strategic Framework Lebanon TVET_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A31.087Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle:
              '8.1.5 Gender Inequality in the World of Work_ESTT_2019',
            tools: [
              {
                id: 266,
                type: 'g',
                original:
                  '8.1.7 Gender Inequality in the World of Work_ESTT_2019 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A39.953Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 6,
            shortTitle: '8.1.6 Plan of action youth employment ILO_2020',
            tools: [
              {
                id: 267,
                type: 'none',
                original: '8.1.8 Plan of action youth employment ILO_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A49%3A53.108Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 7,
            shortTitle: '8.1.7 Productive Employment Synthesis - RIDSSA 2018',
            tools: [
              {
                id: 268,
                type: 'none',
                original:
                  '8.1.9 Productive Employment Synthesis - RIDSSA 2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A05.393Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: `Proposal and budget development`,
        description: `Having the capacity to develop adequate and viable project proposals is key for the design phase (see Phase 2) of your YEE project, but also for preparing follow-up and replication initiatives. `,
        content: {
          mainContent:
            'There is a wide variety of tools for the development of projects in the area of technical and vocational education and training. A specific aspect of proposal development is the inclusion of a strategy and actions that ensure that your project will be a catalyser for transforming gender relations in education and at work. The viability of your project proposal depends on the ability to identify, map and analyse potential sources for the financing of the proposed initiatives as well as developing a realistic budget.',
          subContents: [],
        },
        image: stage8,
        tools: [
          {
            id: 1,
            shortTitle:
              '8.2.1 ChallengesandOpportunitiesofTVETinDevelopingCountriesACaseofSudan 2019',
            tools: [
              {
                id: 269,
                type: 'none',
                original:
                  '8.2.5 ChallengesandOpportunitiesofTVETinDevelopingCountriesACaseofSudan 2019.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A10.417Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '8.2.2 TVET influence on World Economy',
            tools: [
              {
                id: 270,
                type: 'none',
                original: '8.2.6 TVET influence on World Economy.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A14.203Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle: '8.2.3 TVET labour inclusion and equality 2019 UNESCO',
            tools: [
              {
                id: 271,
                type: 'none',
                original:
                  '8.2.7 TVET labour inclusion and equality 2019 UNESCO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A19.541Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Evidence-Based Lobby and Advocacys',
        description: `Another aspect of project sustainability is the inclusion and replication of its models and methodologies in educational centres, public policies and private sector initiatives. `,
        image: stage8,
        content: {
          mainContent: `If you want governmental institutions, private companies, educational centres and other local actors to integrate your YEE initiatives into their policies and practices, you will need to systematise the learnings and transfer the acquired knowledge to them. But first they need to be convinced of the added value of your initiatives. This requires the use of evidence-based advocacy and lobbying strategies and practices. Your project should include the necessary financial and human resources for this component. Human resources can be trained in lobby and advocacy skills within the framework of your project. `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '8.3.1 Orientacio╠ün metodolo╠ügica de mapeo de donantes para un organismo internacional en Centro America',
            tools: [
              {
                id: 272,
                type: 'none',
                original:
                  '8.3.1 Orientacio╠ün metodolo╠ügica de mapeo de donantes para un organismo internacional en Centro America.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A26.287Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '8.3.2 How-does-aid-support-womens-economic-empowerment-OECD-2021',
            tools: [
              {
                id: 273,
                type: 'none',
                original:
                  '8.3.3 - 6.6 How-does-aid-support-womens-economic-empowerment-OECD-2021.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A30.179Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle: '8.3.3 Gender Smart Financing_Europe_EU_2020',
            tools: [
              {
                id: 274,
                type: 'none',
                original:
                  '8.3.4 - 6.6 Gender Smart Financing_Europe_EU_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A35.096Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'Strengthening strategic alliances ',
        description: `Establishing strategic alliances is key for the sustainability of your YEE project.`,
        image: stage8,
        content: {
          mainContent: `You cannot start early enough with the establishment of strategic alliances for your project. It is one thing to form alliances, another to make them strong enough to last after the project has finished. The more time you have to strengthen the partnerships initiated in the framework of your project, the stronger they will be upon project completion and the more chance you have that the initiated process will continue. 
          Strategic alliances must be established with all key actors from the public, private and civic sectors, through public-private partnerships. Already in Phases 1 and 2 we demonstrated the importance of identifying the possibilities to establish strategic alliances. In this final phase of your YEE project, these alliances must be strong enough to guarantee the continuity and replication of your initiatives. When you work closely together with public and private partners during project implementation, they can acquire the necessary experience and knowledge for the development of new policies and projects to promote the successful entry of young men and women on the market of employment and entrepreneurship. 
          Partnerships with the private sector are key to ensure that TVET curricula align with the requirements of the labour market. This should include a gender equality focus to facilitate access and retention of young women in skills development, employment and entrepreneurship. Your project can provide gender equality training for TVET staff and private sector supervisors. Make sure you include these subjects in the partnership agreements!
          `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle: '8.4.1 Gender responsive communication in development',
            tools: [
              {
                id: 275,
                type: 'g',
                original:
                  '8.4.1 Gender responsive communication in development - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A43.600Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '8.4.2 Gender Responsive National Communications Toolkit - UNDP',
            tools: [
              {
                id: 276,
                type: 'g',
                original:
                  '8.4.2 Gender Responsive National Communications Toolkit - UNDP - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A49.435Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: `Examples and good practices`,
        description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.`,
        image: stage8,
        content: {
          mainContent: '',
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle: '8.5.1 Evidence based advocacy for gender in Education',
            tools: [
              {
                id: 277,
                type: 'g',
                original:
                  '8.5.3 Evidence based advocacy for gender in Education - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A50%3A55.988Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '8.5.2 gd-oxfam-guide-feminist-influencing-en',
            tools: [
              {
                id: 278,
                type: 'none',
                original: '8.5.6 gd-oxfam-guide-feminist-influencing-en.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A51%3A02.644Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 279,
                type: 'none',
                original: '8.5.6 gd-oxfam-guide-feminist-influencing-es.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A51%3A08.921Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '8.5.3 The education_we_want_youth_advocacy_toolkit_Plan-UNESCO_2015',
            tools: [
              {
                id: 280,
                type: 'none',
                original:
                  '8.5.8 The education_we_want_youth_advocacy_toolkit_Plan-UNESCO_2015.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A51%3A15.081Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: `Monitoring, evaluation and learnings`,
    stageNumber: 9,
    sections: [
      {
        id: 1,
        title: `Monitoring and evaluation system `,
        description: `Different data collection methods are used in Monitoring and Evaluation (M&E). Quantitative methods help to generate statistical evidence; qualitative methods help gather deeper and more nuanced information about individual and collective experiences and interpretations of the change process.`,
        image: stage9,
        content: {
          mainContent: `An M&E system consists of a set of indicators that are periodically monitored with the goal to collect information that can help to improve the implementation and achievement of desired results of the project. Recollecting information can be done with different tools such as:

          A.	Characterization and registration form: collects in a standardized way the basic information of each participant through a list of questions during registration. This is the baseline of your YEE project (see also Phase 1). The form can also be used to select the target group of the project (see also section 3.2).
          B.	Youth monitoring survey: aims to collect information from each participant to measure their performance in relation to the indicators of the project. 
          C.	Partner monitoring survey: aims to collect information on project performance indicators through questionnaires for partnering entities (TVET centres, companies and public institutions that provide training, (self) employment services, jobs, apprenticeship or internships for young people). 
          D.	Satisfaction interviews or focus group discussions with participants and partners: aim to explore the satisfaction and perceptions of the different project parties through an individual or group interview or focus group, which complement the monitoring surveys with more qualitative data on the project’s intervention to provide feedback and improve it. 
          E.	Monitoring system and systematisation matrixes: you can organize the above tools in separate matrixes that facilitate analysis and insertion into the monitoring system. The monitoring system will provide an overview of the status of each of the main indicators of your project at the moment of collection and compare them to their status at the start of the project (baseline, see Phase 1). 
          F.	Action Learning: is a process that involves a small group working on real problems, taking action, and learning as individuals, as a team, and as an organization. It helps organizations develop creative, flexible and successful strategies to pressing problems. For more information see World Institute for Action Learning.
          G.	External evaluation: consists of the collection, systematisation, analysis and reporting of data related to the achievements of the project’s Theory of Change (see Phase 2) by a specialized agency that has not been involved with the project previously. Often the following OECD DAC criteria are evaluated: relevance, effectiveness, efficiency, impact and sustainability.
          
          Before interviewing minors don’t forget to have their guardians sign an informed consent form to get formal authorization. Also explain to the minors themselves what the collected information will be used for and let them know they can withdraw at any time if they don’t want to be interviewed anymore. Be aware to have safeguarding guidelines in place to guarantee a safe environment for youth’s participation and in particular for young women.
          
          When designing indicators, important to have clear how the information will be collected. To ensure that the indicators are objectively verifiable they have to be SMART (Specific, Measurable, Achievable, Relevant and Time bound). 
          
          Here are some additional tips for the M&E process:
          	Clearly define the output, outcome, and impact indicators according to the project’s Theory of Change. 
          Indicate for each indicator the target group (disaggregated by gender, age and other relevant characteristics), source of information, actor responsible for collecting the information, measurement frequency, and observations on data quality. 
          Develop a user-friendly information management system that allows standardizing and optimizing the procedures for measuring, storing and managing the information of the different project indicators. 
          Include an M&E office in your budget or hire an expert on monitoring and evaluation to manage the whole process. 
          Define a procedure for permanent control of the monitoring information in alliance with project partners such as vocational training institutes. 
          Differentiate all questions and information by gender to capture differences in the performance of women, men and other genders 
          
          Plan has developed YES!ME, a digital monitoring system for the registration and follow-up of the participants of a YEE project. The system can monitor young people for up to 6 years after their participation in the project. Similarly, the system collects information to measure the impact of the project at the individual level as well as collectively.
          
          `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '9.1.1 Guide on Measuring Decent Jobs for Youth_M&E_ILO',
            tools: [
              {
                id: 290,
                type: 'none',
                original:
                  '9.1.7.3 Guide on Measuring Decent Jobs for Youth_M&E_ILO.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A52%3A56.836Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: `M&E with a gender focus`,
        description: `Monitoring and evaluation with a gender perspective aims to evaluate the intentional and unintentional effects of the YEE project on gender relations and the empowerment of women. `,
        image: stage9,
        content: {
          mainContent: `Gender should be addressed in ongoing monitoring and during periodic evaluations for the same reasons that we address other issues: when assessing whether an activity is achieving its objectives, we can consider what has been achieved and what can be learned for future efforts. If results are not evaluated in terms of gender strategies and interventions, the latter are unlikely to receive attention during project implementation.

          Gender-sensitive M&E in a results-based framework reveals the extent to which the project has achieved improvements in the social and economic well-being of women and men. It also helps improve project performance during implementation by facilitating mid-term adjustments and helps draw lessons for future projects, for example by detecting and addressing gender-based constraints.
          
          Gender-sensitive M&E should not only collect gender data, but also analyse the underlying causes of gender differences and implement actions to achieve gender equity. Interventions aimed at empowering women or other groups, without considering the people in their environment (at work, but also at home or in the community) and the gender relations between them, can fail. Gender-sensitive M&E can identify unintended consequences of the project as well as opportunities for empowerment of specific youth groups. By demonstrating the effects of interventions for both women and men, this data can be used to adjust project implementation towards a more equitable development, benefiting young people of all genders, age groups and ethnicities. 
          
          In order to conduct gender-sensitive monitoring and evaluation, sex-disaggregated data is required and must be collected continuously (see Phase 1).
          
          Gender should be included from the beginning of the project and in the design of the monitoring plan or system. If a monitoring framework already exists (such as a logical framework or theory of change), a gender focus should be integrated. This involves reviewing all indicators, targets, results, data collection methods, etcetera on their gender responsiveness and adding gender-sensitive indicators, results, and methods if necessary. Ideally, this is done in an integrated way, from the start of a project. If gender has not been taken into account at the project design phase, it will most likely not be taken into account during implementation either. 
          
          Institutional structures and guidelines are needed to support good gender oversight at the national, local and project levels. Train project staff and other parties on how to make specific and adequate references to gender in supervision forms, progress reports, and other project related documents. Although a gender expert should be included in the M&E team, s/he cannot be solely responsible for this. 
          
          These indicators should be gender-sensitive, not only those at output and outcome, but, most of all, those at impact level. In other words, they should not focus only on the number of women participating in training and employment, but also pay attention to the intensity, content and remuneration of their participation. Pay attention to the real benefits for women in terms of social and economic empowerment, and in reducing gender-based inequalities. 
          `,
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '9.2.1 Measuring Womens Econ Emp_FINAL_2015_UN Foundation',
            tools: [
              {
                id: 291,
                type: 'g',
                original:
                  '9.2.0 Measuring Womens Econ Emp_FINAL_2015_UN Foundation - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A12.099Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle:
              '9.2.2 Lessons in Theory of Change - Gender and Inclusion',
            tools: [
              {
                id: 292,
                type: 'g',
                original:
                  '9.2.1.3 Lessons in Theory of Change - Gender and Inclusion - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A18.251Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '9.2.3 Measuring gender-transformative change. A review of literature and promising practices - CARE',
            tools: [
              {
                id: 293,
                type: 'g',
                original:
                  '9.2.2.1 Measuring gender-transformative change. A review of literature and promising practices - CARE - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A22.784Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 294,
                type: 'g',
                original: '9.2.2.3 UN-Women Evaluation Handbook - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A32.299Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 295,
                type: 'g',
                original:
                  '9.2.2.4 Measuring-womens-economic-empowerment_2020.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A39.479Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 4,
            shortTitle:
              '9.2.4 Guia para la elaboracion de indicadores de genero',
            tools: [
              {
                id: 296,
                type: 'g',
                original:
                  '9.2.3.3  Guia para la elaboracion de indicadores de genero - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A44.297Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 297,
                type: 'none',
                original:
                  '9.2.3.5 tool-kit-gender-equality-results-indicators.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A47.431Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
              {
                id: 298,
                type: 'none',
                original:
                  '9.2.3.6 practical-guide-to-measuring-womens-and-girls-empowerment-in-impact-evaluations.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A53%3A55.533Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
              {
                id: 299,
                type: 'g',
                original:
                  "9.2.3.7 Measuring Women's Empowerment in Agriculture_IFAD_2017 - G.pdf",
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A13.442Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 5,
            shortTitle: '9.2.5 Gender Measures and Data in Covid-19 era',
            tools: [
              {
                id: 300,
                type: 'none',
                original:
                  '9.2.4.3 Gender Measures and Data in Covid-19 era.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A19.858Z0-homepage+-+Best+Practices+Guidelines+and+Toolkit+on+Engaging+the+Private+Sector+in+Skills+Development+-+P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'Learnings',
        description: `In this section, various tools are presented to guide the systematisation of YEE experiences in order to draw lessons learned from ongoing or completed processes that can serve as input for the formulation of new initiatives or making adjustments to existing ones.`,
        content: {
          mainContent: ` `,
          subContents: [``],
        },
        image: stage9,
        tools: [
          {
            id: 1,
            shortTitle: '9.3.1 Outcome Harvesting',
            tools: [
              {
                id: 301,
                type: 'none',
                original: '9.3.1.2 Outcome Harvesting.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A32.383Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 2,
            shortTitle: '9.3.2 Sustained-Effects-Economic-Empowerment_CGD_2016',
            tools: [
              {
                id: 302,
                type: 'g',
                original:
                  '9.3.2.2 Sustained-Effects-Economic-Empowerment_CGD_2016 - G.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A36.322Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
          {
            id: 3,
            shortTitle:
              '9.3.3 Using Youth Employment Program Beneficiary Data_S4YE_WB_2018',
            tools: [
              {
                id: 303,
                type: 'none',
                original:
                  '9.3.3 Using Youth Employment Program Beneficiary Data_S4YE_WB_2018.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A40.791Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: `Examples and good practices`,
        description: `In this section you can find a variety of project documents and practical experiences that can serve as inspiration for your youth economic empowerment initiatives. We invite you to share your good practice examples as well.`,
        image: stage9,
        content: {
          mainContent: '',
          subContents: [],
        },
        tools: [
          {
            id: 1,
            shortTitle:
              '9.4.1 How to Evaluate Economic Growth - whatworksgrowth.org',
            tools: [
              {
                id: 304,
                type: 'p',
                original:
                  '9.4.1 How to Evaluate Economic Growth - whatworksgrowth.org - P.pdf',
                link:
                  'https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A54%3A44.986Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf',
              },
            ],
          },
        ],
      },
    ],
  },
]
