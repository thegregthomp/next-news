import React, { useContext } from 'react';
import AuthCheck from '@/auth/AuthCheck';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { UserContext } from '@/lib/context';
import { auth, firestore } from '@/lib/firebase';
import { query } from 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import Multiselect from 'multiselect-react-dropdown';
import { sourceConverter } from '@/lib/converters';

type Props = {};

function Account({}: Props) {
  const { user } = useContext(UserContext);
  const [sources, loading, error] = useCollectionDataOnce(
    query(firestore.collection('sources').withConverter(sourceConverter))
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
      {sources && console.log(sources)}
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
      <AuthCheck>{user && <div>Hello, {user.firstName}</div>}</AuthCheck>
    </Main>
  );
}

export default Account;
