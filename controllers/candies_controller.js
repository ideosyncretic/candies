// function listCandies (req, res) {
//   res.json(candies);
// }
//
// function createCandies(req, res) {
//   console.log(req.body);
//
//   // invalid color exit
//   if (validColors.indexOf(req.body.color) === -1) {
//     res.status(422).json({
//       message: `Candy not valid and not created.`});
//     return;
//   }
//
//   var candy = {
//     id: parseInt(req.body.id, 10),
//     name: req.body.name,
//     color: req.body.color
//   };
//
//   candies.push(candy);
//
//   res.status(201).json({message: 'Candy created',
//   id: req.body.id,
//   name: req.body.name,
//   color: req.body.color
//   });
// }
//
// module.exports = {
// index: listCandies,
// create: createCandies
// };
