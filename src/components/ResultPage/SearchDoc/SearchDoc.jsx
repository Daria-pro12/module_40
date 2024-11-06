import React, { useEffect } from "react";
import ComponentSearchDoc from "./ComponentSearchDoc/ComponentSearchDoc";
import CustomTitle from "../../CustomComponents/CustomTitle";
import { CustomButton } from "../../CustomComponents/CustomButton";
import "./SearchDoc.css";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { Documents, loadMore } from "../../../store/Slicers/DocumentsSlicer";
import { CustomCard } from "../../CustomComponents/CustomCard";

const SearchDoc = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("lg"));
    const accessToken = localStorage.getItem("accessToken");
    const dispatch = useDispatch();
    const encodedIDs = useSelector((state) => state.objectsearch);
    const limitDocs = Number(useSelector((state) => state.documents.limitDocs)) - 10;

    useEffect(() => {
        if (encodedIDs.success && encodedIDs.objectSearch.items.length > 0) {
            const body = {
                ids: encodedIDs.objectSearch.items.map((item) => item.encodedId),
            };
            dispatch(Documents({ accessToken: accessToken, body: body }));
        }
    }, [dispatch, encodedIDs?.success, encodedIDs?.objectSearch, accessToken]);

    const returnType = (attributes) => {
        if (attributes.isTechNews) return "Технические новости";
        if (attributes.isAnnouncement) return "Анонсы и события";
        if (attributes.isDigest) return "Сводки новостей";
        return "Без категории";
    };

    const docs = useSelector((state) => state.documents);
    console.log(docs);
    const docsCount = docs.documents ? docs.documents.length : 0;


    const shouldAddMargin = limitDocs === -10;

    return (
        <>
            <div>
                <CustomTitle variant="h4" sx={{ marginBottom: { xs: "35px", lg: "60px" }, marginTop: { xs: "60px", lg: "110px" } }} matches={matches}  >
                    СПИСОК ДОКУМЕНТОВ
                </CustomTitle>
            </div>
            {!docs.loading && docs.documents !== null ? (
                <div className="cards-docs" style={{ marginBottom: shouldAddMargin ? "110px" : "0" }}>
                    {docs.documents.slice(0, docsCount <= 10 ? docsCount : docsCount - limitDocs).map((item) => (
                        <CustomCard key={item.ok.id} className="card-news-docs">
                            <ComponentSearchDoc
                                textDate={item.ok.issueDate}
                                textSource={item.ok.source.name}
                                textHeader={item.ok.title.text}
                                textType={returnType(item.ok.attributes.isTechNews,
                                    item.ok.attributes.isAnnouncement,
                                    item.ok.attributes.isDigest)}
                                text={item.ok.content.markup}
                                textNumWord={`${item.ok.attributes.wordCount} слов`}
                                image={item.ok.image}
                                url={item.ok.url}
                            />
                        </CustomCard>
                    ))}
                </div>
            ) : (
                <CircularProgress />
            )}

            <CustomButton
                style={{ display: limitDocs === -10 ? "none" : "block", margin: "40px auto 110px" }}
                variant="blue"
                onClick={() => {
                    dispatch(loadMore(limitDocs < 10 ? 0 : limitDocs));
                }}
            >
                Показать больше
            </CustomButton>

        </>
    );
};

export default SearchDoc;