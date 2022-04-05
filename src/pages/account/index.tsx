import React, { useContext } from 'react';
import AuthCheck from '@/auth/AuthCheck';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { UserContext } from '@/lib/context';
import { auth, firestore, firebaseConfig } from '@/lib/firebase';
import { query } from 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import Multiselect from 'multiselect-react-dropdown';
import { sourceConverter } from '@/lib/converters';
import Image from 'next/image';

type Props = {};

function Account({}: Props) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const { user } = useContext(UserContext);
  const [sources, loading, error] = useCollectionDataOnce(
    query(firestore.collection('sources').withConverter(sourceConverter))
  );
  //need the generic query here to wait for subs before we get todays
  const [captures, capturesLoading, capturesError] = useCollectionDataOnce(
    query(
      firestore
        .collection('captures')
        .where('day', '==', dd)
        .where('month', '==', mm)
      // where('sourceId', 'in', sources[id])
    )
  );

  const onSelect = () => {
    return null;
  };
  const onRemove = () => {
    return null;
  };
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <AuthCheck>
        {user ? (
          <>
            <div>Hello, {user.firstName}</div>
            {captures && (
              <div className="flex w-full flex-wrap">
                {captures.map((capture, i) => {
                  return (
                    <div className="w-1/2" key={i}>
                      <Image
                        src={capture.url}
                        alt="rest"
                        className="block"
                        width="1200"
                        height="1200"
                      />
                      {capture.url}
                    </div>
                  );
                })}
              </div>
            )}
            {sources && (
              <div>
                <Multiselect
                  options={sources.map((source, i) => {
                    return { name: source.name, id: i };
                  })} // Options to display in the dropdown
                  // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </AuthCheck>
    </Main>
  );
}

export default Account;
