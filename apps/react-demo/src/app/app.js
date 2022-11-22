import '@fazio/ipfs-upload-button';

export function App() {
  const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRiMjk5MEFiNzVjZmQ0MTgyN0EzQTNjNGViNjdFRDA1Y0YwNTU5M0MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDM2NjExODA1MDAsIm5hbWUiOiJuZ3h3ZWIzIn0.AMvg_jKnPB2pRPiR6f8AebIHrldAwMCpxILQ7av_SD8';

  return (
    <>
      <div/>
      <h1>
          Welcome React JS 👋
      </h1>
      <web3-upload-btn 
        token={token}
        isdisplayresult={true}
        isdisplaytoast={false}></web3-upload-btn>
      <div />
    </>
  );
}
export default App;
