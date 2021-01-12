import Head from "next/head";
import { useAuthUser } from "../auth/hook/useAuthUser";
//import dynamic from "next/dynamic";
//import { useEffect, useState } from "react";
//import Photos from "../photos/container/Photos";
import dynamic from "next/dynamic";
import PhotoSkeletons from "../component/PhotoSkeletons";
import { limitPhotosPerQuery } from "../config";
import commonClasses from "./../../styles/commonClasses.module.scss";

const DynamicPhotos = dynamic(() => import("../photos/container/Photos"), {
  loading: () => (
    <div className={commonClasses.wallOfPhotos}>
      {<PhotoSkeletons numberOfSkeletons={limitPhotosPerQuery} />}
    </div>
  ),
});

const PreLoadPhotos = ({ loading, user }) => (
  <>
    {loading && <p>...Проверка аккаунта, пожалуйста, подождите.</p>}
    {!loading && !user && <p>Пожалуйста войдите в свой Google аккаунт.</p>}
  </>
);

export default function Home() {
  const { user, loading } = useAuthUser();
  return (
    <>
      <Head>
        <title>Lizzygram - фотографии малышки.</title>
      </Head>

      {(loading || !user) && <PreLoadPhotos loading={loading} user={user} />}

      {user && <DynamicPhotos />}

      {/*  <Photos /> */}
      {/* <p>Hello, from hell.</p> */}
    </>
  );
}
