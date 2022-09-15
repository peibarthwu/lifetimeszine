import Birthdays from "./Birthdays";
import Anniversaries from "./Anniversaries";

export default function Article() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl pt-[60px]">Today</h1>
        <div className="md:max-w-md pt-[5px]">
          <p>Hello,</p>
          <p>
            This week marked Labor Day (the symbolic bookend to summer), the
            first chilly evenings of Fall, and the end of a second Elizabethan
            era.
          </p>
          <img src="marie2.jpeg" className="w-full"></img>
          <p>
            In New York, this week has also marked the start of fashion week(s),
            and AREA 17 was in the mix. On Wednesday, our Senior Partnerships
            Strategist Hannah Conway moderated a fascinating panel on fashion
            and the gaming world, in conversation with guests working to bring
            digital solutions to the retail industry. We&apos;ll circulate the
            video next week.
          </p>
          <img src="image1.png" className="w-full"></img>
          <p>
            This week, we also launched a case study detailing our collaboration
            with NIKE Inc. Thank you to everyone involved in helping get this
            out!
          </p>
          <p>
            Next week, on Tuesday, 9/13, both studios will gather for a Global
            Assembly, led by Hannah K. For context, courtesy of Hannah K: Global
            assemblies are regular &apos;town hall&apos; gatherings. Three times
            per year (once per Cycle) senior leadership shares the
            behind-the-scenes of how we&apos;re doing as an organization, key
            updates or areas of focus and OKRs, and creating space for dialogue
            on anything currently important for the team. Looking forward to
            seeing everyone at 10:30 ET!
          </p>
          <p>And now a few updates ahead of the weekend!</p>
          <h1 className="text-4xl pt-[20px]">Celebrations</h1>
          <Birthdays />
          <Anniversaries />
          <img src="marie.jpeg" className="w-full"></img>
          <h2 className="text-2xl pt-[10px]">
            Bon week end à tous, enjoy your weekend!
          </h2>
        </div>
      </div>
    </>
  );
}
