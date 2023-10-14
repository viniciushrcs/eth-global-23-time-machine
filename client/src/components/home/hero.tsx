export default function Hero() {
  return (
    <section>
      <div className="min-h-full flex items-center">
        <div className="py-24 w-1/2 px-14">
          <h1 className="text-4xl font-primary font-semibold lg:text-5xl">
            Give gifts that really matters
          </h1>
          <p className="text-xl py-6">
            Create Savings Capsules and save money for the future of the
            children you love
          </p>
        </div>
        <div className="w-1/2">
          <img width={'auto'} src="/hero.svg" alt="hero" />
        </div>
      </div>
    </section>
  );
}
