import classes from "./Home.module.css";
import clas from "./about.module.css";
const About = () => {
  return (
    <div className={classes.rightbottom}>
      <div className={clas.div}>
        <p className={clas.title}>Book keeping</p>
        <li className={clas.list}>
          Bookkeeping helps to keep track of receipts, payments. Sales,
          purchases and record of every other transaction made from the
          business.
        </li>

        <li className={clas.list}>
          It helps to summarize the income, expenditure and other ledger records
          periodically.
        </li>

        <li className={clas.list}>
          It provides information to create financial reports which tells us
          specific information about the business as how much profits the
          business has made or how much the business is worth at a specific
          point of time.
        </li>
      </div>
    </div>
  );
};
export default About;
