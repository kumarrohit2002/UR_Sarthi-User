const Loader = () => {
  return (
    <div className="text-center my-20">
      <div
        className="inline-block border-orange-500 h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    </div>
  )
}

export default Loader;